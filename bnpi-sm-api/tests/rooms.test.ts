import { eq } from "drizzle-orm";
import request from "supertest";
import app from "../app";
import { requireDb } from "../config/db";
import { bookings } from "../db/schema/bookings";
import { rooms } from "../db/schema/rooms";
import { users } from "../db/schema/users";
import { hashPassword } from "../lib/password";

const TEST_ROOM_NAME = `Rooms Test Room ${Date.now()}`;
const OCCUPIED_ROOM_NAME = `Rooms Test Occupied Room ${Date.now()}`;
let testRoomId: number;
let occupiedRoomId: number;
let testUserId: number;

beforeAll(async () => {
  const db = requireDb();

  const [row] = await db
    .insert(rooms)
    .values({ name: TEST_ROOM_NAME, type: "meeting" })
    .returning();
  testRoomId = row.id;

  const [occupiedRow] = await db
    .insert(rooms)
    .values({ name: OCCUPIED_ROOM_NAME, type: "meeting" })
    .returning();
  occupiedRoomId = occupiedRow.id;

  const passwordHash = await hashPassword("irrelevant-for-this-suite");
  const [user] = await db
    .insert(users)
    .values({
      email: `rooms-test-${Date.now()}@bandai.local`,
      passwordHash,
      displayName: "Rooms Test User",
      role: "front_desk",
    })
    .returning();
  testUserId = user.id;

  const now = new Date();
  await db.insert(bookings).values({
    roomId: occupiedRoomId,
    createdByUserId: testUserId,
    title: "Currently in progress",
    startsAt: new Date(now.getTime() - 30 * 60 * 1000),
    endsAt: new Date(now.getTime() + 30 * 60 * 1000),
  });
});

afterAll(async () => {
  const db = requireDb();
  await db.delete(bookings).where(eq(bookings.createdByUserId, testUserId));
  await db.delete(users).where(eq(users.id, testUserId));
  await db.delete(rooms).where(eq(rooms.id, testRoomId));
  await db.delete(rooms).where(eq(rooms.id, occupiedRoomId));
});

describe("feature: rooms", () => {
  describe("GET /api/v1/rooms", () => {
    it("is public (no auth header required) and includes the seeded room", async () => {
      const res = await request(app).get("/api/v1/rooms");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: testRoomId,
            name: TEST_ROOM_NAME,
            type: "meeting",
            currentStatus: "vacant",
          }),
        ])
      );
    });

    it("reports occupied for a room with a confirmed booking covering now", async () => {
      const res = await request(app).get("/api/v1/rooms");

      const occupied = res.body.data.find((r: { id: number }) => r.id === occupiedRoomId);
      expect(occupied.currentStatus).toBe("occupied");
    });
  });

  describe("GET /api/v1/rooms/:id", () => {
    it("returns the room for a valid id", async () => {
      const res = await request(app).get(`/api/v1/rooms/${testRoomId}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        id: testRoomId,
        name: TEST_ROOM_NAME,
        type: "meeting",
        isActive: true,
        currentStatus: "vacant",
      });
    });

    it("returns 404 for an unknown id", async () => {
      const res = await request(app).get("/api/v1/rooms/999999999");
      expect(res.status).toBe(404);
    });

    it("returns 400 for a non-numeric id", async () => {
      const res = await request(app).get("/api/v1/rooms/not-a-number");
      expect(res.status).toBe(400);
    });
  });
});

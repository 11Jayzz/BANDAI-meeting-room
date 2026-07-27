import { eq } from "drizzle-orm";
import request from "supertest";
import app from "../app";
import { requireDb } from "../config/db";
import { rooms } from "../db/schema/rooms";
import { users } from "../db/schema/users";
import { bookings } from "../db/schema/bookings";
import { signAuthToken } from "../lib/jwt";
import { hashPassword } from "../lib/password";

const TEST_DATE = "2030-06-15"; // far-future date, isolated from any seed data
const suffix = Date.now();

let roomAId: number;
let roomBId: number;
let staffUserId: number;
let token: string;

// +08:00 matches APP_TIMEZONE_OFFSET (config/constants.ts) — the day-window
// filtering in bookings.service.ts uses this offset, not bare UTC midnight.
function iso(hour: number, minute = 0) {
  return `${TEST_DATE}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00.000+08:00`;
}

beforeAll(async () => {
  const db = requireDb();

  const [roomA] = await db
    .insert(rooms)
    .values({ name: `Bookings Test Room A ${suffix}`, type: "meeting" })
    .returning();
  const [roomB] = await db
    .insert(rooms)
    .values({ name: `Bookings Test Room B ${suffix}`, type: "meeting" })
    .returning();
  roomAId = roomA.id;
  roomBId = roomB.id;

  const passwordHash = await hashPassword("irrelevant-for-this-suite");
  const [staffUser] = await db
    .insert(users)
    .values({
      email: `bookings-test-${suffix}@bandai.local`,
      passwordHash,
      displayName: "Bookings Test Staff",
      role: "front_desk",
    })
    .returning();
  staffUserId = staffUser.id;

  token = signAuthToken({ sub: staffUser.id, email: staffUser.email, role: "front_desk" });
});

afterAll(async () => {
  const db = requireDb();
  await db.delete(bookings).where(eq(bookings.createdByUserId, staffUserId));
  await db.delete(users).where(eq(users.id, staffUserId));
  await db.delete(rooms).where(eq(rooms.id, roomAId));
  await db.delete(rooms).where(eq(rooms.id, roomBId));
});

describe("feature: bookings", () => {
  describe("POST /api/v1/bookings", () => {
    it("returns 401 with no token", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .send({ roomId: roomAId, title: "No auth", startsAt: iso(9), endsAt: iso(10) });

      expect(res.status).toBe(401);
    });

    it("creates a booking with a valid token", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomAId, title: "Team standup", startsAt: iso(9), endsAt: iso(9, 30) });

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        roomId: roomAId,
        title: "Team standup",
        status: "confirmed",
      });
    });

    it("returns 400 when endsAt is not after startsAt", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomAId, title: "Bad range", startsAt: iso(11), endsAt: iso(10) });

      expect(res.status).toBe(400);
    });

    it("returns 409 for an overlapping booking in the same room", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomAId, title: "Overlap", startsAt: iso(9, 15), endsAt: iso(9, 45) });

      expect(res.status).toBe(409);
    });

    it("allows the same time window in a different room", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomBId, title: "Different room", startsAt: iso(9), endsAt: iso(9, 30) });

      expect(res.status).toBe(201);
    });

    it("allows back-to-back bookings in the same room (half-open range)", async () => {
      const res = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomAId, title: "Right after", startsAt: iso(9, 30), endsAt: iso(10) });

      expect(res.status).toBe(201);
    });
  });

  describe("GET /api/v1/bookings/availability", () => {
    it("is public and redacts title/creator", async () => {
      const res = await request(app).get(`/api/v1/bookings/availability?date=${TEST_DATE}`);

      expect(res.status).toBe(200);
      const roomAEntry = res.body.data.rooms.find((r: { roomId: number }) => r.roomId === roomAId);
      expect(roomAEntry.bookings.length).toBeGreaterThanOrEqual(2);
      for (const b of roomAEntry.bookings) {
        expect(b.title).toBeUndefined();
        expect(b.createdByUserId).toBeUndefined();
      }
    });
  });

  describe("GET /api/v1/bookings", () => {
    it("requires auth and returns full detail including title", async () => {
      const unauth = await request(app).get(`/api/v1/bookings?date=${TEST_DATE}`);
      expect(unauth.status).toBe(401);

      const res = await request(app)
        .get(`/api/v1/bookings?date=${TEST_DATE}&roomId=${roomAId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.some((b: { title: string }) => b.title === "Team standup")).toBe(true);
    });
  });

  describe("cancel + check-in", () => {
    it("cancels a booking, frees the slot, and rejects double-cancel", async () => {
      const createRes = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomBId, title: "To be cancelled", startsAt: iso(13), endsAt: iso(14) });
      const bookingId = createRes.body.data.id;

      const cancelRes = await request(app)
        .post(`/api/v1/bookings/${bookingId}/cancel`)
        .set("Authorization", `Bearer ${token}`);
      expect(cancelRes.status).toBe(200);
      expect(cancelRes.body.data.status).toBe("cancelled");

      const doubleCancelRes = await request(app)
        .post(`/api/v1/bookings/${bookingId}/cancel`)
        .set("Authorization", `Bearer ${token}`);
      expect(doubleCancelRes.status).toBe(409);

      const rebookRes = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomBId, title: "Rebooked after cancel", startsAt: iso(13), endsAt: iso(14) });
      expect(rebookRes.status).toBe(201);
    });

    it("checks in a booking and rejects a second check-in", async () => {
      const createRes = await request(app)
        .post("/api/v1/bookings")
        .set("Authorization", `Bearer ${token}`)
        .send({ roomId: roomAId, title: "Check-in target", startsAt: iso(16), endsAt: iso(17) });
      const bookingId = createRes.body.data.id;

      const checkInRes = await request(app)
        .post(`/api/v1/bookings/${bookingId}/check-in`)
        .set("Authorization", `Bearer ${token}`);
      expect(checkInRes.status).toBe(200);
      expect(checkInRes.body.data.checkinMethod).toBe("manual");
      expect(checkInRes.body.data.checkedInAt).toBeTruthy();

      const secondCheckInRes = await request(app)
        .post(`/api/v1/bookings/${bookingId}/check-in`)
        .set("Authorization", `Bearer ${token}`);
      expect(secondCheckInRes.status).toBe(409);
    });
  });
});

import { eq } from "drizzle-orm";
import request from "supertest";
import app from "../app";
import { requireDb } from "../config/db";
import { users } from "../db/schema/users";
import { hashPassword } from "../lib/password";

const TEST_EMAIL = `auth-test-${Date.now()}@bandai.local`;
const TEST_PASSWORD = "correct-horse-battery-staple-placeholder";
let testUserId: number;

beforeAll(async () => {
  const db = requireDb();
  const passwordHash = await hashPassword(TEST_PASSWORD);
  const [row] = await db
    .insert(users)
    .values({
      email: TEST_EMAIL,
      passwordHash,
      displayName: "Auth Test User",
      role: "front_desk",
    })
    .returning();
  testUserId = row.id;
});

afterAll(async () => {
  const db = requireDb();
  await db.delete(users).where(eq(users.id, testUserId));
});

describe("feature: auth", () => {
  describe("POST /api/v1/auth/login", () => {
    it("returns a token + user profile for correct credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.data.token).toBe("string");
      expect(res.body.data.user).toMatchObject({
        id: testUserId,
        email: TEST_EMAIL,
        role: "front_desk",
      });
      expect(res.body.data.user.passwordHash).toBeUndefined();
    });

    it("is case-insensitive and trims the email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: `  ${TEST_EMAIL.toUpperCase()}  `,
          password: TEST_PASSWORD,
        });

      expect(res.status).toBe(200);
    });

    it("returns 401 for a wrong password and 401 for an unknown email, with the same message", async () => {
      const wrongPasswordRes = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: TEST_EMAIL, password: "wrong-password-placeholder" });

      const unknownEmailRes = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "nobody-here@bandai.local", password: TEST_PASSWORD });

      expect(wrongPasswordRes.status).toBe(401);
      expect(unknownEmailRes.status).toBe(401);
      expect(unknownEmailRes.body.message).toBe(wrongPasswordRes.body.message);
    });

    it("returns 400 for missing email/password", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({});
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("returns 401 with no token", async () => {
      const res = await request(app).get("/api/v1/auth/me");
      expect(res.status).toBe(401);
    });

    it("returns 401 with a malformed token", async () => {
      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer not-a-real-token");

      expect(res.status).toBe(401);
    });

    it("returns the profile for a valid token", async () => {
      const loginRes = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: TEST_EMAIL, password: TEST_PASSWORD });
      const token = loginRes.body.data.token as string;

      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        id: testUserId,
        email: TEST_EMAIL,
        role: "front_desk",
      });
    });
  });
});

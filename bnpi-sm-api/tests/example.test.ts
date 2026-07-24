import request from "supertest";
import app from "../app";
import { INVALID_REQUEST_DATA_MESSAGE } from "../config/constants";

describe("example module (Zod validation)", () => {
  it("GET /api/example/status returns success envelope", async () => {
    const res = await request(app).get("/api/example/status");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      data: {
        module: "example",
        ready: true,
      },
    });
    expect(res.body.data.validation).toMatchObject({
      body: "POST /echo",
      query: "GET /items",
      params: "GET /items/:id",
    });
  });

  describe("body validation (POST /echo)", () => {
    it("echoes a valid message", async () => {
      const res = await request(app)
        .post("/api/example/echo")
        .send({ message: "hello sr", meta: { from: "test" } });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.echo).toBe("hello sr");
      expect(res.body.data.meta).toEqual({ from: "test" });
      expect(typeof res.body.data.receivedAt).toBe("string");
    });

    it("trims message whitespace", async () => {
      const res = await request(app)
        .post("/api/example/echo")
        .send({ message: "  padded  " });

      expect(res.status).toBe(200);
      expect(res.body.data.echo).toBe("padded");
    });

    it("returns 400 for empty message", async () => {
      const res = await request(app)
        .post("/api/example/echo")
        .send({ message: "" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(INVALID_REQUEST_DATA_MESSAGE);
      expect(res.body.target).toBe("body");
      expect(res.body.errors).toBeDefined();
    });

    it("returns 400 for missing message", async () => {
      const res = await request(app).post("/api/example/echo").send({});

      expect(res.status).toBe(400);
      expect(res.body.target).toBe("body");
    });
  });

  describe("query validation (GET /items)", () => {
    it("applies default page and limit", async () => {
      const res = await request(app).get("/api/example/items");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.page).toBe(1);
      expect(res.body.data.limit).toBe(20);
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });

    it("coerces page and limit from strings", async () => {
      const res = await request(app).get("/api/example/items?page=2&limit=5");

      expect(res.status).toBe(200);
      expect(res.body.data.page).toBe(2);
      expect(res.body.data.limit).toBe(5);
    });

    it("returns 400 for invalid page", async () => {
      const res = await request(app).get("/api/example/items?page=0");

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(INVALID_REQUEST_DATA_MESSAGE);
      expect(res.body.target).toBe("query");
    });

    it("returns 400 for limit over max", async () => {
      const res = await request(app).get("/api/example/items?limit=999");

      expect(res.status).toBe(400);
      expect(res.body.target).toBe("query");
    });
  });

  describe("params validation (GET /items/:id)", () => {
    it("returns item for valid id", async () => {
      const res = await request(app).get("/api/example/items/abc-123");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        id: "abc-123",
        found: true,
      });
    });
  });
});

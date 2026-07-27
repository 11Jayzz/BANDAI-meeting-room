import request from "supertest";
import {
  APP_NAME,
  APP_ROOT_MESSAGE,
  FORBIDDEN_MESSAGE,
  ROUTE_NOT_FOUND_MESSAGE,
} from "../config/constants";
import app from "../app";

describe("API integration", () => {
  it("GET / returns root status", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe(APP_ROOT_MESSAGE);
  });

  it("GET /api/health returns health payload", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe(APP_NAME);
    expect(typeof res.body.timestamp).toBe("string");
  });

  it("GET /api/health/ready returns readiness payload", async () => {
    const res = await request(app).get("/api/health/ready");

    // This repo's test env has DATABASE_URL configured (TEST_DATABASE_URL —
    // see tests/setup-env.js) so the auth/rooms/bookings suites can run
    // against real Postgres; readiness reflects that as "up", not "disabled".
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ready");
    expect(res.body.service).toBe(APP_NAME);
    expect(res.body.checks).toMatchObject({
      redis: "disabled",
      postgres: "up",
    });
  });

  it("GET /api/docs.json returns OpenAPI spec", async () => {
    const res = await request(app).get("/api/docs.json");

    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.0.3");
    expect(res.body.info.title).toBe("BNPI SM API");
    expect(res.body.paths["/api/health"]).toBeDefined();
    expect(res.body.paths["/api/example/echo"]).toBeDefined();
  });

  it("GET /api/docs.json sets server URL from request host", async () => {
    const res = await request(app)
      .get("/api/docs.json")
      .set("Host", "example.local");

    expect(res.status).toBe(200);
    expect(res.body.servers[0].url).toBe("http://example.local");
  });

  it("GET /api/health returns 403 for disallowed origin", async () => {
    const res = await request(app)
      .get("/api/health")
      .set("Origin", "http://malicious.local");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(FORBIDDEN_MESSAGE);
  });

  it("unknown route returns 404", async () => {
    const res = await request(app).get("/api/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe(ROUTE_NOT_FOUND_MESSAGE);
  });

  it("sets x-request-id on responses", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toEqual(expect.any(String));
  });

  it("honors inbound x-request-id", async () => {
    const res = await request(app)
      .get("/api/health")
      .set("x-request-id", "client-trace-123");

    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toBe("client-trace-123");
  });

  it("rejects oversized JSON payloads", async () => {
    const huge = "x".repeat(250_000);
    const res = await request(app)
      .post("/api/health")
      .set("Content-Type", "application/json")
      .send(`{"data":"${huge}"}`);

    // Body parser limit is 200kb — error handler maps statusCode 413
    expect(res.status).toBe(413);
    expect(res.body.message).toBe("Payload too large");
  });

  it("allows allowed CORS origin on health", async () => {
    const res = await request(app)
      .get("/api/health")
      .set("Origin", "http://localhost:5173");

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173"
    );
  });
});

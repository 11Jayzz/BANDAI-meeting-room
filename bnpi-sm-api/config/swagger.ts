import {
  APP_NAME,
  APP_ROOT_MESSAGE,
  HEALTH_STATUS_OK,
  INVALID_REQUEST_DATA_MESSAGE,
  RATE_LIMIT_MESSAGE,
  ROUTE_NOT_FOUND_MESSAGE,
} from "./constants";
import { env } from "./env";

const defaultServerUrl = env.APP_BASE_URL ?? `http://localhost:${env.PORT}`;
const serverDescriptionByEnv: Record<typeof env.NODE_ENV, string> = {
  development: "Development server",
  production: "Production server",
  test: "Test server",
};

const baseSwaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "BNPI SM API",
    version: "0.1.0",
    description:
      "BNPI SM modular Express API scaffold. System health, reference example module, and extension points for domain features.",
    contact: {
      name: "BNPI SM project team",
    },
  },
  tags: [
    { name: "System", description: "Liveness, readiness, docs" },
    {
      name: "Example",
      description:
        "Reference module demonstrating Zod validation, service layer, and success envelopes",
    },
    // FEATURE_SWAGGER_TAGS_START
    // (auto-managed by feature:new … module — do not remove markers)
// FEATURE_BLOCK_START:swagger-tag:auth
    {
      name: "Auth",
      description: "Email/password login and current-user session (JWT bearer)",
    },
// FEATURE_BLOCK_END:swagger-tag:auth
// FEATURE_BLOCK_START:swagger-tag:rooms
    {
      name: "Rooms",
      description: "The 4 bookable rooms (3 meeting + 1 VIP) — public read-only",
    },
// FEATURE_BLOCK_END:swagger-tag:rooms
// FEATURE_BLOCK_START:swagger-tag:bookings
    {
      name: "Bookings",
      description:
        "Auto-scaffolded feature (bookings) — replace stub with domain operations",
    },
// FEATURE_BLOCK_END:swagger-tag:bookings
    // FEATURE_SWAGGER_TAGS_END
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RootStatus: {
        type: "string",
        example: APP_ROOT_MESSAGE,
      },
      HealthResponse: {
        type: "object",
        additionalProperties: false,
        required: ["status", "service", "timestamp"],
        properties: {
          status: { type: "string", example: HEALTH_STATUS_OK },
          service: { type: "string", example: APP_NAME },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2026-04-14T06:11:00.000Z",
          },
        },
      },
      ReadinessResponse: {
        type: "object",
        additionalProperties: false,
        required: ["status", "service", "timestamp", "checks"],
        properties: {
          status: {
            type: "string",
            enum: ["ready", "degraded"],
            example: "ready",
          },
          service: { type: "string", example: APP_NAME },
          timestamp: { type: "string", format: "date-time" },
          checks: {
            type: "object",
            additionalProperties: false,
            required: ["redis", "postgres"],
            properties: {
              redis: {
                type: "string",
                enum: ["up", "down", "disabled"],
                example: "disabled",
              },
              postgres: {
                type: "string",
                enum: ["up", "down", "disabled"],
                example: "disabled",
              },
            },
          },
        },
      },
      ExampleStatusData: {
        type: "object",
        required: ["module", "purpose", "ready"],
        properties: {
          module: { type: "string", example: "example" },
          purpose: { type: "string" },
          ready: { type: "boolean", example: true },
        },
      },
      ExampleEchoRequest: {
        type: "object",
        additionalProperties: false,
        required: ["message"],
        properties: {
          message: {
            type: "string",
            minLength: 1,
            maxLength: 500,
            example: "hello",
          },
          meta: {
            type: "object",
            additionalProperties: true,
            example: { source: "swagger" },
          },
        },
      },
      ExampleEchoData: {
        type: "object",
        required: ["echo", "receivedAt", "meta"],
        properties: {
          echo: { type: "string", example: "hello" },
          receivedAt: { type: "string", format: "date-time" },
          meta: { type: "object", additionalProperties: true },
        },
      },
      ApiSuccessExampleStatus: {
        type: "object",
        required: ["success", "data"],
        properties: {
          success: { type: "boolean", example: true },
          data: { $ref: "#/components/schemas/ExampleStatusData" },
        },
      },
      ApiSuccessExampleEcho: {
        type: "object",
        required: ["success", "data"],
        properties: {
          success: { type: "boolean", example: true },
          data: { $ref: "#/components/schemas/ExampleEchoData" },
        },
      },
      ValidationErrorResponse: {
        type: "object",
        additionalProperties: false,
        required: ["message", "errors"],
        properties: {
          message: {
            type: "string",
            example: INVALID_REQUEST_DATA_MESSAGE,
          },
          errors: { type: "object", additionalProperties: true },
        },
      },
      RateLimitResponse: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string", example: RATE_LIMIT_MESSAGE },
        },
      },
      NotFoundResponse: {
        type: "object",
        additionalProperties: false,
        required: ["message"],
        properties: {
          message: { type: "string", example: ROUTE_NOT_FOUND_MESSAGE },
        },
      },
      // FEATURE_SWAGGER_SCHEMAS_START
      // (auto-managed by feature:new … module — do not remove markers)
// FEATURE_BLOCK_START:swagger-schema:auth
      LoginRequest: {
        type: "object",
        additionalProperties: false,
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "bdss-admin@bandai.local" },
          password: { type: "string", minLength: 1, maxLength: 200, example: "password123" },
        },
      },
      AuthUserProfile: {
        type: "object",
        required: ["id", "email", "displayName", "role", "isActive"],
        properties: {
          id: { type: "integer", example: 1 },
          email: { type: "string", format: "email" },
          displayName: { type: "string", example: "BDSS Admin" },
          role: { type: "string", enum: ["admin", "front_desk"] },
          isActive: { type: "boolean" },
        },
      },
      LoginResponse: {
        type: "object",
        required: ["token", "user"],
        properties: {
          token: { type: "string", description: "JWT bearer token" },
          user: { $ref: "#/components/schemas/AuthUserProfile" },
        },
      },
// FEATURE_BLOCK_END:swagger-schema:auth
// FEATURE_BLOCK_START:swagger-schema:rooms
      Room: {
        type: "object",
        required: ["id", "name", "type", "isActive", "currentStatus"],
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Meeting Room 1" },
          type: { type: "string", enum: ["meeting", "vip"] },
          isActive: { type: "boolean" },
          currentStatus: {
            type: "string",
            enum: ["occupied", "vacant"],
            description: "Whether a confirmed booking covers the current moment",
          },
        },
      },
// FEATURE_BLOCK_END:swagger-schema:rooms
// FEATURE_BLOCK_START:swagger-schema:bookings
      BookingsRequest: {
        type: "object",
        additionalProperties: false,
        required: ["message"],
        properties: {
          message: {
            type: "string",
            minLength: 1,
            maxLength: 1000,
            example: "hello",
          },
        },
      },
      BookingsResponse: {
        type: "object",
        required: ["ok", "echo"],
        properties: {
          ok: { type: "boolean", example: true },
          echo: { type: "string", example: "hello" },
        },
      },
// FEATURE_BLOCK_END:swagger-schema:bookings
      // FEATURE_SWAGGER_SCHEMAS_END
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["System"],
        summary: "Root status message",
        responses: {
          "200": {
            description: "Plain-text status",
            content: {
              "text/plain": {
                schema: { $ref: "#/components/schemas/RootStatus" },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "Liveness",
        responses: {
          "200": {
            description: "Process is up",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthResponse" },
              },
            },
          },
        },
      },
    },
    "/api/health/ready": {
      get: {
        tags: ["System"],
        summary: "Readiness (dependency checks)",
        responses: {
          "200": {
            description: "Ready",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ReadinessResponse" },
              },
            },
          },
          "503": {
            description: "Degraded (e.g. Redis down)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ReadinessResponse" },
              },
            },
          },
        },
      },
    },
    "/api/docs": {
      get: {
        tags: ["System"],
        summary: "Swagger UI",
        responses: {
          "200": { description: "Swagger UI HTML" },
        },
      },
    },
    "/api/docs.json": {
      get: {
        tags: ["System"],
        summary: "OpenAPI document",
        responses: {
          "200": {
            description: "OpenAPI 3 JSON",
            content: {
              "application/json": {
                schema: { type: "object", additionalProperties: true },
              },
            },
          },
        },
      },
    },
    "/api/example/status": {
      get: {
        tags: ["Example"],
        summary: "Reference module status",
        responses: {
          "200": {
            description: "Success envelope",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiSuccessExampleStatus" },
              },
            },
          },
          "429": {
            description: "Rate limited",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RateLimitResponse" },
              },
            },
          },
        },
      },
    },
    "/api/example/echo": {
      post: {
        tags: ["Example"],
        summary: "Echo a message (Zod body validation)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ExampleEchoRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Echoed payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiSuccessExampleEcho" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
          "429": {
            description: "Rate limited",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RateLimitResponse" },
              },
            },
          },
        },
      },
    },
    "/api/example/items": {
      get: {
        tags: ["Example"],
        summary: "List items (Zod query validation: page, limit)",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", minimum: 1, default: 1 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
          },
        ],
        responses: {
          "200": {
            description: "Paginated demo list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        limit: { type: "integer" },
                        total: { type: "integer" },
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              label: { type: "string" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid query",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/example/items/{id}": {
      get: {
        tags: ["Example"],
        summary: "Get item by id (Zod params validation)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", minLength: 1 },
          },
        ],
        responses: {
          "200": {
            description: "Item payload",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["success", "data"],
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        label: { type: "string" },
                        found: { type: "boolean" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid path param",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    // FEATURE_SWAGGER_PATHS_START
    // (auto-managed by feature:new … module — do not remove markers)
// FEATURE_BLOCK_START:swagger-path:auth
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in with email + password, returns a JWT bearer token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login succeeded",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
          "401": { description: "Invalid email or password" },
        },
      },
    },
    "/api/v1/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Current authenticated user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Authenticated user profile",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthUserProfile" },
              },
            },
          },
          "401": { description: "Missing, invalid, or expired token" },
        },
      },
    },
// FEATURE_BLOCK_END:swagger-path:auth
// FEATURE_BLOCK_START:swagger-path:rooms
    "/api/v1/rooms": {
      get: {
        tags: ["Rooms"],
        summary: "List active rooms",
        responses: {
          "200": {
            description: "Rooms list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Room" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/rooms/{id}": {
      get: {
        tags: ["Rooms"],
        summary: "Get a room by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Room",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Room" },
                  },
                },
              },
            },
          },
          "404": { description: "Room not found" },
        },
      },
    },
// FEATURE_BLOCK_END:swagger-path:rooms
// FEATURE_BLOCK_START:swagger-path:bookings
    "/api/v1/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Bookings scaffold endpoint (replace with domain ops)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BookingsRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Scaffold success — expand for domain",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BookingsResponse" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
        },
      },
    },
// FEATURE_BLOCK_END:swagger-path:bookings
    // FEATURE_SWAGGER_PATHS_END
  },
};

export function getSwaggerDocument(serverUrl = defaultServerUrl) {
  return {
    ...baseSwaggerDocument,
    servers: [
      {
        url: serverUrl,
        description: serverDescriptionByEnv[env.NODE_ENV],
      },
    ],
  };
}

export const swaggerDocument = getSwaggerDocument();

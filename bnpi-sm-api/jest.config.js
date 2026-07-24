/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/setup-env.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup-after-env.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  collectCoverageFrom: [
    "app.ts",
    "config/**/*.ts",
    "db/**/*.ts",
    "helper/**/*.ts",
    "lib/**/*.ts",
    "utils/**/*.ts",
    "middleware/**/*.ts",
    "modules/**/*.ts",
    "schema/**/*.ts",
    "server.ts",
    "types/**/*.ts",
    "!**/*.d.ts",
  ],
};

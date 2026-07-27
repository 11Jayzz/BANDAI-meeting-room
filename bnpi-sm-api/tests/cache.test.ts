import {
  clearMemoryCache,
  deleteCacheValue,
  getCacheValue,
  setCacheValue,
} from "../helper/cache";

describe("cache helper (memory fallback)", () => {
  beforeEach(() => {
    clearMemoryCache();
  });

  it("stores and reads values", async () => {
    await setCacheValue("k1", { hello: "world" }, 60_000);
    const value = await getCacheValue<{ hello: string }>("k1");
    expect(value).toEqual({ hello: "world" });
  });

  it("returns null for missing keys", async () => {
    const value = await getCacheValue("missing");
    expect(value).toBeNull();
  });

  it("deletes values", async () => {
    await setCacheValue("k2", { a: 1 }, 60_000);
    await deleteCacheValue("k2");
    const value = await getCacheValue("k2");
    expect(value).toBeNull();
  });

  it("expires values after ttl", async () => {
    jest.useFakeTimers();
    await setCacheValue("k3", { a: 1 }, 1000);
    jest.advanceTimersByTime(1001);
    const value = await getCacheValue("k3");
    expect(value).toBeNull();
    jest.useRealTimers();
  });
});

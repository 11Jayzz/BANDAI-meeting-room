import {
  idParamSchema,
  nonEmptyString,
  paginationQuerySchema,
} from "../schema/common";

describe("schema/common helpers", () => {
  it("nonEmptyString trims and rejects empty", () => {
    expect(nonEmptyString().safeParse("  hi  ").success).toBe(true);
    expect(nonEmptyString().safeParse("  hi  ").data).toBe("hi");
    expect(nonEmptyString().safeParse("").success).toBe(false);
    expect(nonEmptyString().safeParse("   ").success).toBe(false);
  });

  it("paginationQuerySchema defaults and coerces", () => {
    const empty = paginationQuerySchema.safeParse({});
    expect(empty.success).toBe(true);
    if (empty.success) {
      expect(empty.data).toEqual({ page: 1, limit: 20 });
    }

    const coerced = paginationQuerySchema.safeParse({
      page: "3",
      limit: "10",
    });
    expect(coerced.success).toBe(true);
    if (coerced.success) {
      expect(coerced.data).toEqual({ page: 3, limit: 10 });
    }
  });

  it("idParamSchema requires non-empty id", () => {
    expect(idParamSchema.safeParse({ id: "x" }).success).toBe(true);
    expect(idParamSchema.safeParse({ id: "" }).success).toBe(false);
    expect(idParamSchema.safeParse({}).success).toBe(false);
  });
});

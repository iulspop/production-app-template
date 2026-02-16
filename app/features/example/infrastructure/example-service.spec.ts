import { describe, expect, test } from "vitest";

describe("example integration", () => {
  test("given: a fetch request, should: return a response", async () => {
    const actual = await Promise.resolve({ status: 200 });
    const expected = { status: 200 };

    expect(actual).toEqual(expected);
  });
});

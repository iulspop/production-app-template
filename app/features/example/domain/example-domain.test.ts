import { describe, expect, test } from "vitest";

import { add } from "./example-domain";

describe("add()", () => {
  test("given: two numbers, should: return their sum", () => {
    const actual = add(1, 2);
    const expected = 3;

    expect(actual).toEqual(expected);
  });
});

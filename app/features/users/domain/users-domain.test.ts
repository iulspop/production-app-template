import { describe, expect, test } from "vitest";

import {
  isUserValidationError,
  userValidationErrorToMessage,
  validateEmail,
  validateName,
} from "./users-domain";

describe("validateEmail()", () => {
  test("given: a valid email, should: return trimmed lowercase email", () => {
    const result = validateEmail("  Alice@Example.COM  ");

    expect(result).toEqual({ data: "alice@example.com", success: true });
  });

  test("given: an empty string, should: return EMAIL_EMPTY error", () => {
    const result = validateEmail("   ");

    expect(result).toEqual({ error: "EMAIL_EMPTY", success: false });
  });

  test("given: an invalid email, should: return EMAIL_INVALID error", () => {
    const result = validateEmail("not-an-email");

    expect(result).toEqual({ error: "EMAIL_INVALID", success: false });
  });

  test("given: an email with spaces, should: trim and lowercase", () => {
    const result = validateEmail("  Test@Test.com ");

    expect(result).toEqual({ data: "test@test.com", success: true });
  });
});

describe("validateName()", () => {
  test("given: a valid name, should: return trimmed name", () => {
    const result = validateName("  Alice  ");

    expect(result).toEqual({ data: "Alice", success: true });
  });

  test("given: an empty name, should: return NAME_EMPTY error", () => {
    const result = validateName("   ");

    expect(result).toEqual({ error: "NAME_EMPTY", success: false });
  });

  test("given: a name exceeding 100 characters, should: return NAME_TOO_LONG error", () => {
    const result = validateName("a".repeat(101));

    expect(result).toEqual({ error: "NAME_TOO_LONG", success: false });
  });

  test("given: a name of exactly 100 characters, should: succeed", () => {
    const name = "a".repeat(100);
    const result = validateName(name);

    expect(result).toEqual({ data: name, success: true });
  });
});

describe("userValidationErrorToMessage()", () => {
  test("given: EMAIL_EMPTY, should: return readable message", () => {
    expect(userValidationErrorToMessage("EMAIL_EMPTY")).toBe(
      "Email is required.",
    );
  });

  test("given: EMAIL_INVALID, should: return readable message", () => {
    expect(userValidationErrorToMessage("EMAIL_INVALID")).toBe(
      "Please enter a valid email address.",
    );
  });

  test("given: NAME_EMPTY, should: return readable message", () => {
    expect(userValidationErrorToMessage("NAME_EMPTY")).toBe(
      "Name is required.",
    );
  });

  test("given: NAME_TOO_LONG, should: return readable message", () => {
    expect(userValidationErrorToMessage("NAME_TOO_LONG")).toBe(
      "Name must be 100 characters or fewer.",
    );
  });
});

describe("isUserValidationError()", () => {
  test("given: a valid error code, should: return true", () => {
    expect(isUserValidationError("EMAIL_EMPTY")).toBe(true);
    expect(isUserValidationError("NAME_TOO_LONG")).toBe(true);
  });

  test("given: an invalid string, should: return false", () => {
    expect(isUserValidationError("NOT_AN_ERROR")).toBe(false);
  });
});

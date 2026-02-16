// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * Discriminated result union. Defined locally so the domain file
 * remains pure (zero imports).
 */
export type Result<T, E> =
  | { error: E; success: false }
  | { data: T; success: true };

export type UserValidationError =
  | "EMAIL_EMPTY"
  | "EMAIL_INVALID"
  | "NAME_EMPTY"
  | "NAME_TOO_LONG";

// ─── Constants ───────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;

const userValidationErrorMessages = {
  EMAIL_EMPTY: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  NAME_EMPTY: "Name is required.",
  NAME_TOO_LONG: "Name must be 100 characters or fewer.",
} as const;

// ─── Functions ───────────────────────────────────────────────────────────────

/**
 * Validates and normalises an email address.
 */
export const validateEmail = (
  email: string,
): Result<string, UserValidationError> => {
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length === 0) return { error: "EMAIL_EMPTY", success: false };
  if (!EMAIL_REGEX.test(trimmed))
    return { error: "EMAIL_INVALID", success: false };
  return { data: trimmed, success: true };
};

/**
 * Validates and trims a display name.
 */
export const validateName = (
  name: string,
): Result<string, UserValidationError> => {
  const trimmed = name.trim();
  if (trimmed.length === 0) return { error: "NAME_EMPTY", success: false };
  if (trimmed.length > MAX_NAME_LENGTH)
    return { error: "NAME_TOO_LONG", success: false };
  return { data: trimmed, success: true };
};

/**
 * Maps user validation errors to human-readable messages.
 */
export const userValidationErrorToMessage = (
  error: UserValidationError,
): string => userValidationErrorMessages[error];

/**
 * Type guard for UserValidationError.
 */
export const isUserValidationError = (
  value: string,
): value is UserValidationError => value in userValidationErrorMessages;

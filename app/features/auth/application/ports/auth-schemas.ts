import type {
  ONBOARD_INTENT,
  SEND_MAGIC_LINK_INTENT,
  VERIFY_CODE_INTENT,
} from "../../domain/auth-constants";

export type AuthActionInput =
  | { email: string; intent: typeof SEND_MAGIC_LINK_INTENT }
  | {
      code: string;
      intent: typeof VERIFY_CODE_INTENT;
      target: string;
      type: string;
    }
  | { email: string; intent: typeof ONBOARD_INTENT; name: string };

export interface AuthSchemasPort {
  safeParse(
    input: unknown,
  ): { data: AuthActionInput; success: true } | { success: false };
}

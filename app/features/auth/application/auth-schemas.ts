import { z } from "zod";

import {
  ONBOARD_INTENT,
  SEND_MAGIC_LINK_INTENT,
  VERIFY_CODE_INTENT,
} from "../domain/auth-constants";

export const sendMagicLinkSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required." }),
  intent: z.literal(SEND_MAGIC_LINK_INTENT),
});

export const verifyCodeSchema = z.object({
  code: z.string().trim().min(1, { message: "Code is required." }),
  intent: z.literal(VERIFY_CODE_INTENT),
  target: z.string().min(1),
  type: z.string().min(1),
});

export const onboardSchema = z.object({
  email: z.string().trim().min(1),
  intent: z.literal(ONBOARD_INTENT),
  name: z.string().trim().min(1, { message: "Name is required." }),
});

export const authActionSchema = z.discriminatedUnion("intent", [
  onboardSchema,
  sendMagicLinkSchema,
  verifyCodeSchema,
]);

export type AuthActionSchema = z.infer<typeof authActionSchema>;
export type OnboardSchema = z.infer<typeof onboardSchema>;
export type SendMagicLinkSchema = z.infer<typeof sendMagicLinkSchema>;
export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>;

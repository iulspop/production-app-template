import type { VerificationRecord } from "./verifications-repository";
import type { Factory } from "~/utils/types";

export interface VerificationsFactoryPort {
  create: Factory<VerificationRecord & { createdAt: Date; id: string }>;
}

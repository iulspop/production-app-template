import type { SessionRecord } from "./sessions-repository";
import type { Factory } from "~/utils/types";

export interface SessionsFactoryPort {
  create: Factory<SessionRecord & { createdAt: Date; updatedAt: Date }>;
}

export type VerificationRecord = {
  algorithm: string;
  charSet: string;
  digits: number;
  expiresAt: Date;
  period: number;
  secret: string;
  target: string;
  type: string;
};

export interface VerificationsRepositoryPort {
  deleteByTypeAndTarget(
    input: Pick<VerificationRecord, "target" | "type">,
  ): Promise<VerificationRecord>;
  retrieveByTypeAndTarget(
    input: Pick<VerificationRecord, "target" | "type">,
  ): Promise<VerificationRecord | null>;
  save(verification: VerificationRecord): Promise<VerificationRecord>;
}

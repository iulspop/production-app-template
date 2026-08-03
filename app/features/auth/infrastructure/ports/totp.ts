export type VerificationTOTP = {
  algorithm: string;
  charSet: string;
  digits: number;
  otp: string;
  period: number;
  secret: string;
};

export interface TotpPort {
  generate(): Promise<VerificationTOTP>;
  verify(verification: VerificationTOTP): Promise<unknown>;
}

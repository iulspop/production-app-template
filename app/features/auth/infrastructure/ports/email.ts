export type MagicLinkEmail = {
  code: string;
  email: string;
  magicLinkUrl: string;
};

export interface EmailPort {
  sendMagicLink(email: MagicLinkEmail): Promise<void>;
}

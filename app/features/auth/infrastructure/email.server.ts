import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Sends a magic-link email with a 6-digit code.
 * Falls back to console.log when RESEND_API_KEY is not set (dev mode).
 *
 * @param params - The email recipient, code, and magic link URL.
 */
export async function sendMagicLinkEmail({
  code,
  email,
  magicLinkUrl,
}: {
  code: string;
  email: string;
  magicLinkUrl: string;
}) {
  if (!resend) {
    console.log(`[Auth] Magic link for ${email}:`);
    console.log(`  Code: ${code}`);
    console.log(`  Link: ${magicLinkUrl}`);
    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@example.com",
    html: `<p>Your login code is: <strong>${code}</strong></p><p>Or click this link: <a href="${magicLinkUrl}">${magicLinkUrl}</a></p>`,
    subject: "Your login code",
    to: email,
  });
}

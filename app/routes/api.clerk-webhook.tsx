import { Webhook } from "svix";

import type { Route } from "./+types/api.clerk-webhook";
import {
  retrieveUserFromDatabaseByClerkId,
  saveUserToDatabase,
  updateUserInDatabaseByClerkId,
} from "~/features/users/infrastructure/adapters/users-model.server";

type ClerkUserEvent = {
  data: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    first_name: string | null;
    last_name: string | null;
  };
  type: "user.created" | "user.updated";
};

const extractUserFields = (eventData: ClerkUserEvent["data"]) => ({
  clerkId: eventData.id,
  email: eventData.email_addresses[0]?.email_address ?? "",
  name: [eventData.first_name, eventData.last_name].filter(Boolean).join(" "),
});

export async function action({ request }: Route.ActionArgs) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await request.text();

  const wh = new Webhook(webhookSecret);
  let event: ClerkUserEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp,
    }) as ClerkUserEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const { clerkId, email, name } = extractUserFields(event.data);

  if (event.type === "user.created") {
    const existing = await retrieveUserFromDatabaseByClerkId(clerkId);
    if (!existing) {
      await saveUserToDatabase({ clerkId, email, name });
    }
  }

  if (event.type === "user.updated") {
    await updateUserInDatabaseByClerkId(clerkId, { email, name });
  }

  return new Response("OK", { status: 200 });
}

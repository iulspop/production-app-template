import { Form } from "react-router";

import { SEND_MAGIC_LINK_INTENT } from "../domain/auth-constants";
import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

type LoginPageActionData =
  | { error: string; success: false }
  | { error: null; success: true }
  | undefined;

export function LoginPageComponent({
  actionData,
}: {
  actionData?: LoginPageActionData;
}) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome back</h1>
      <p className="mb-8 text-muted-foreground">
        Enter your email to sign in or create an account.
      </p>

      <Form className="space-y-4" method="post">
        <div>
          <Input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </div>
        <Button
          className="w-full"
          name="intent"
          type="submit"
          value={SEND_MAGIC_LINK_INTENT}
        >
          Continue with email
        </Button>
        {actionData?.success === false && (
          <FieldError>
            {isUserValidationError(actionData.error)
              ? userValidationErrorToMessage(
                  actionData.error as UserValidationError,
                )
              : actionData.error}
          </FieldError>
        )}
      </Form>
    </main>
  );
}

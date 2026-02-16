import { Form } from "react-router";

import { ONBOARD_INTENT } from "../domain/auth-constants";
import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

type OnboardingPageActionData =
  | { error: string; success: false }
  | { error: null; success: true }
  | undefined;

export function OnboardingPageComponent({
  actionData,
  email,
}: {
  actionData?: OnboardingPageActionData;
  email: string;
}) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Welcome! Let's set up your account
      </h1>
      <p className="mb-8 text-muted-foreground">What should we call you?</p>

      <Form className="space-y-4" method="post">
        <input name="email" type="hidden" value={email} />
        <div>
          <Input
            autoComplete="name"
            name="name"
            placeholder="Your name"
            type="text"
          />
        </div>
        <Button
          className="w-full"
          name="intent"
          type="submit"
          value={ONBOARD_INTENT}
        >
          Get started
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

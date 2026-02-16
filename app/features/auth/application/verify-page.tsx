import { Form } from "react-router";

import { VERIFY_CODE_INTENT } from "../domain/auth-constants";
import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";

type VerifyPageActionData =
  | { error: string; success: false }
  | { error: null; success: true }
  | undefined;

export function VerifyPageComponent({
  actionData,
  target,
  type,
}: {
  actionData?: VerifyPageActionData;
  target: string;
  type: string;
}) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Check your email
      </h1>
      <p className="mb-8 text-muted-foreground">
        We sent a 6-digit code to {target}. Enter it below.
      </p>

      <Form className="space-y-4" method="post">
        <input name="type" type="hidden" value={type} />
        <input name="target" type="hidden" value={target} />
        <div>
          <Input
            autoComplete="one-time-code"
            className="text-center text-2xl tracking-widest"
            maxLength={6}
            name="code"
            placeholder="XXXXXX"
            type="text"
          />
        </div>
        <Button
          className="w-full"
          name="intent"
          type="submit"
          value={VERIFY_CODE_INTENT}
        >
          Verify code
        </Button>
        {actionData?.success === false && (
          <FieldError>{actionData.error}</FieldError>
        )}
      </Form>
    </main>
  );
}

import type { FormEventHandler } from "react";

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";

type VerifyPageComponentProps = {
  error: string | null;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  target: string;
};

export function VerifyPageComponent({
  error,
  isPending,
  onSubmit,
  target,
}: VerifyPageComponentProps) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Check your email
      </h1>
      <p className="mb-8 text-muted-foreground">
        We sent a 6-digit code to {target}. Enter it below.
      </p>

      <form className="space-y-4" onSubmit={onSubmit}>
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
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Verifying..." : "Verify code"}
        </Button>
        {error && <FieldError>{error}</FieldError>}
      </form>
    </main>
  );
}

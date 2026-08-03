import type { FormEventHandler } from "react";

export type LoginPageComponentProps = {
  error: string | null;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";

export function LoginPageComponent({
  error,
  isPending,
  onSubmit,
}: LoginPageComponentProps) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome back</h1>
      <p className="mb-8 text-muted-foreground">
        Enter your email to sign in or create an account.
      </p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </div>
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Sending code..." : "Continue with email"}
        </Button>
        {error && <FieldError>{error}</FieldError>}
      </form>
    </main>
  );
}

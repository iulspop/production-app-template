import type { FormEventHandler } from "react";

export type OnboardingPageComponentProps = {
  error: string | null;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { Input } from "~/components/ui/input";

export function OnboardingPageComponent({
  error,
  isPending,
  onSubmit,
}: OnboardingPageComponentProps) {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Welcome! Let's set up your account
      </h1>
      <p className="mb-8 text-muted-foreground">What should we call you?</p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Input
            autoComplete="name"
            name="name"
            placeholder="Your name"
            type="text"
          />
        </div>
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Setting up..." : "Get started"}
        </Button>
        {error && <FieldError>{error}</FieldError>}
      </form>
    </main>
  );
}

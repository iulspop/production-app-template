import { useSignIn, useSignUp } from "@clerk/react-router";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router";

import type { Route } from "./+types/login";
import { authAction } from "~/features/auth/application/auth-action.server";
import {
  getUserIdFromContext,
  isClerkEnabled,
} from "~/features/auth/application/auth-middleware.server";
import { extractClerkError } from "~/features/auth/application/clerk-error";
import { LoginPageComponent } from "~/features/auth/application/login-page";
import { SEND_MAGIC_LINK_INTENT } from "~/features/auth/domain/auth-constants";
import type { UserValidationError } from "~/features/users/domain/users-domain";
import {
  isUserValidationError,
  userValidationErrorToMessage,
} from "~/features/users/domain/users-domain";

export const meta: Route.MetaFunction = () => [{ title: "Log in" }];

export async function loader({ context }: Route.LoaderArgs) {
  const userId = getUserIdFromContext(context);
  if (userId)
    throw new Response(null, { headers: { Location: "/" }, status: 302 });
  return { isClerkEnabled: isClerkEnabled() };
}

export async function action(args: Route.ActionArgs) {
  return await authAction(args);
}

function DevLoginContainer({
  actionData,
}: {
  actionData: Route.ComponentProps["actionData"];
}) {
  const submit = useSubmit();
  const [isPending, setIsPending] = useState(false);

  const error =
    actionData?.success === false
      ? isUserValidationError(actionData.error)
        ? userValidationErrorToMessage(actionData.error as UserValidationError)
        : actionData.error
      : null;

  return (
    <LoginPageComponent
      error={error}
      isPending={isPending}
      onSubmit={(e) => {
        e.preventDefault();
        setIsPending(true);
        const fd = new FormData(e.currentTarget);
        fd.set("intent", SEND_MAGIC_LINK_INTENT);
        submit(fd, { method: "post" });
      }}
    />
  );
}

function ClerkLoginContainer() {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  return (
    <LoginPageComponent
      error={error}
      isPending={isPending}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!isSignInLoaded || !isSignUpLoaded) return;
        setError(null);
        setIsPending(true);

        const fd = new FormData(e.currentTarget);
        const email = fd.get("email") as string;

        try {
          const result = await signIn.create({ identifier: email });
          const emailFactor = result.supportedFirstFactors?.find(
            (f) => f.strategy === "email_code",
          );

          if (!emailFactor || !("emailAddressId" in emailFactor)) {
            setError("Email code verification is not available.");
            return;
          }

          await signIn.prepareFirstFactor({
            emailAddressId: emailFactor.emailAddressId,
            strategy: "email_code",
          });
          navigate(
            `/verify?${new URLSearchParams({ mode: "sign-in", target: email })}`,
          );
        } catch {
          try {
            await signUp.create({ emailAddress: email });
            await signUp.prepareEmailAddressVerification({
              strategy: "email_code",
            });
            navigate(
              `/verify?${new URLSearchParams({ mode: "sign-up", target: email })}`,
            );
          } catch (signUpErr) {
            setError(extractClerkError(signUpErr));
          }
        } finally {
          setIsPending(false);
        }
      }}
    />
  );
}

export default function LoginRoute({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  if (loaderData.isClerkEnabled) return <ClerkLoginContainer />;
  return <DevLoginContainer actionData={actionData} />;
}

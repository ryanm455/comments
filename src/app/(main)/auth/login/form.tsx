"use client"
import {
  memo,
  useActionState,
} from "react";

import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { useSearchParams } from "next/navigation";

import PasswordInput from "../../../../components/auth/PasswordInput";
import { Field } from "../../../../components/ui/Field";
import { authenticate } from "./actions";

export const LoginForm = memo(() => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form
      action={formAction}
    >
      {errorMessage && (
        <Alert type="danger" className="mb-2">
          {errorMessage}
        </Alert>
      )}
      <div className="flex flex-col gap-6">
        <Field
          field="email"
          required
        />
        <Field
          as={PasswordInput}
          field="password"
          // @ts-ignore
          minLength={6}
          required
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          type="submit"
          className="font-md"
          disabled={isPending}
          size="large"
          layout="blue"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
});

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
import { register } from "./actions";

export const RegisterForm = memo(({ useCallback }: { useCallback: boolean }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/auth/login';
  const [errorMessage, formAction, isPending] = useActionState(
    register,
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
          field="name"
          required
        />
        <Field
          as={PasswordInput}
          field="password"
          // @ts-ignore
          minLength={6}
          required
        />
        {useCallback && <input type="hidden" name="redirectTo" value={callbackUrl} />}
        <Button
          type="submit"
          disabled={isPending}
          size="large"
          layout="blue"
        >
          Register
        </Button>
      </div>
    </form>
  );
});

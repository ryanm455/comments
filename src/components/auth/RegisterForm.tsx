import { FC, memo, useState } from "react";

import { HookedForm } from "hooked-form";

import { Alert, Button } from "@windmill/react-ui";

import { Field } from "../Field";
import PasswordInput from "./PasswordInput";

const defaultValues = {
  username: "",
  name: "",
  password: "",
};

export const RegisterForm: FC<{
  authenticate: (
    values: Partial<{ username: string; name: string; password: string }>
  ) => Promise<any>;
}> = memo(({ authenticate }) => {
  const [invalid, setInvalid] = useState<string | null>(null);

  return (
    <HookedForm
      onSubmit={values =>
        authenticate(values).catch(() =>
          setInvalid("Username or password is incorrect!")
        )
      }
      validateOnBlur
      initialValues={defaultValues}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          {invalid && (
            <Alert type="danger" className="mb-2">
              {invalid}
            </Alert>
          )}
          <div className="flex flex-col gap-6">
            <Field
              field="username"
              validate={(v: string) => (!v ? "Username is required" : false)}
            />
            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
            />
            <Field
              as={PasswordInput}
              field="password"
              validate={(v: string) => (!v ? "Password is required" : false)}
            />
            <Button
              type="submit"
              disabled={isSubmitting || false}
              onClick={handleSubmit}
              size="large"
              layout="blue"
            >
              Register
            </Button>
          </div>
        </>
      )}
    </HookedForm>
  );
});

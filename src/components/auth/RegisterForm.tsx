import { HookedForm } from "hooked-form";
import { FC, useState } from "react";

import { Alert, AlertIcon, Button, Stack } from "@chakra-ui/react";

import { Field } from "../Field";
import PasswordInput from "./PasswordInput";
import { memo } from "react";

const defaultValues = {
  username: "",
  name: "",
  password: "",
};

export const RegisterForm: FC<{
  authenticate: (
    values: Partial<{ username: string; name: string; password: string }>
  ) => Promise<void>;
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
            <Alert status="error" mb={2}>
              <AlertIcon />
              {invalid}
            </Alert>
          )}
          <Stack spacing="6">
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
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting || false}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </>
      )}
    </HookedForm>
  );
});

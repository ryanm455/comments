import { Card, CardBody } from "@windmill/react-ui";
import { OrContinueWith } from "components/auth/OrContinueWith";
import { RegisterForm } from "components/auth/RegisterForm";
import { useUser } from "lib/hooks";
import { checkIfPopUp } from "lib/login";
import { APP_LOGO } from "meta";
import Router from "next/router";
import { useCallback, useEffect } from "react";

const Register: React.FC = () => {
  const [user, { mutate }] = useUser();

  const authenticate = useCallback(
    async (values): Promise<void> =>
      new Promise(async (resolve, reject) => {
        const user = await fetch("/api/auth/local/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then(r => r?.json())
          .catch(err => reject(err));
        checkIfPopUp(), mutate(user), resolve(user);
      }),
    [mutate]
  );

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push("/");
  }, [user]);

  return (
    <div className="bg-gray-50 dark:bg-inherit min-h-screen py-12 px-4 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="h-8 mb-10 md:mb-20 text-4xl text-center">{APP_LOGO}</h2>
        <h2 className="text-center text-4xl font-extrabold mb-8">
          Create an account
        </h2>
        <Card>
          <CardBody>
            <RegisterForm authenticate={authenticate} />
            <OrContinueWith />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;

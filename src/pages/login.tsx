import { useCallback, useEffect } from "react";

import { LoginForm } from "components/auth/LoginForm";
import { OrContinueWith } from "components/auth/OrContinueWith";
import { Card } from "components/ui/Card";
import { useUser } from "lib/hooks";
import { checkIfPopUp } from "lib/login";
import { APP_LOGO } from "meta";
import Router from "next/router";
import { gqlQuery } from "utils";

import type { User } from "@prisma/client";

const Login: React.FC = () => {
  const [user, { mutate }] = useUser();

  const authenticate = useCallback(
    async ({ username, password }): Promise<User> =>
      new Promise(async (resolve, reject) => {
        const user: User = await gqlQuery(`mutation {
          login(username:"${username}",password:"${password}") {
            username
            name
            provider
            upvotedIds
            downvotedIds
          }
        }`)
          .then((r: any) => r.login)
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
          Sign in to your account
        </h2>
        <Card>
          <LoginForm authenticate={authenticate} />
          <OrContinueWith />
        </Card>
      </div>
    </div>
  );
};

export default Login;

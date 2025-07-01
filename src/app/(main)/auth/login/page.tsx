import { Suspense } from "react";

import { LoginForm } from "app/(main)/auth/login/form";
import { OrContinueWith } from "components/auth/OrContinueWith";
import { Card } from "components/ui/Card";
import { APP_LOGO } from "lib/meta";

const Login = () => (
  <div className="bg-gray-50 dark:bg-inherit min-h-screen py-12 px-4 lg:px-8">
    <div className="max-w-md mx-auto">
      <h2 className="h-8 mb-10 md:mb-20 text-4xl text-center">{APP_LOGO}</h2>
      <h2 className="text-center text-4xl font-extrabold mb-8">
        Sign in to your account
      </h2>
      <Card>
        <Suspense>
          <LoginForm />
        </Suspense>
        <OrContinueWith />
      </Card>
    </div>
  </div>
);

export default Login;

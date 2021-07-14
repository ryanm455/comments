import { Card } from "components/auth/Card";
import { LoginForm } from "components/auth/LoginForm";
import { OrContinueWith } from "components/auth/OrContinueWith";
import { useUser } from "lib/hooks";
import { APP_LOGO } from "meta";
import Router from "next/router";
import { useCallback, useEffect } from "react";

import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const Login: React.FC = () => {
  const [user, { mutate }] = useUser();

  const authenticate = useCallback(
    async (values): Promise<void> =>
      new Promise(async (resolve, reject) => {
        const user = await fetch("/api/auth/local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then(r => r?.json())
          .catch(err => reject(err));
        mutate(user), resolve(user);
      }),
    [mutate]
  );

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push("/");
  }, [user]);

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Heading h="8" mb={{ base: "10", md: "20" }} textAlign="center">
          {APP_LOGO}
        </Heading>
        <Heading textAlign="center" size="xl" fontWeight="extrabold" mb="8">
          Sign in to your account
        </Heading>
        <Card>
          <LoginForm authenticate={authenticate} />
          <OrContinueWith />
        </Card>
      </Box>
    </Box>
  );
};

export default Login;

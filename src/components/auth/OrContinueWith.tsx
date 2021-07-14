import { socialAuth } from "lib/login";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { mutate } from "swr";
import { Provider } from "types/db";

import { Button, SimpleGrid, VisuallyHidden } from "@chakra-ui/react";

import { DividerWithText } from "./DividerWithText";
import { memo } from "react";

export const OrContinueWith = memo(() => (
  <>
    <DividerWithText mt="6">or continue with</DividerWithText>
    <SimpleGrid mt="6" columns={2} spacing="3">
      <Button
        color="currentColor"
        variant="outline"
        onClick={() => socialAuth(Provider.Google, mutate)}
      >
        <VisuallyHidden>Login with Google</VisuallyHidden>
        <FaGoogle />
      </Button>
      <Button
        color="currentColor"
        variant="outline"
        onClick={() => socialAuth(Provider.GitHub, mutate)}
      >
        <VisuallyHidden>Login with Github</VisuallyHidden>
        <FaGithub />
      </Button>
    </SimpleGrid>
  </>
));

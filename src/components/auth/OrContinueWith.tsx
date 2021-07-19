import { socialAuth } from "lib/login";
import React, { memo } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { mutate } from "swr";
import { Provider } from "types/db";

import { Button } from "@windmill/react-ui";

import { DividerWithText } from "./DividerWithText";
import Icon from "components/Icon";

export const OrContinueWith = memo(() => (
  <>
    <DividerWithText className="mt-6">or continue with</DividerWithText>
    <div className="flex gap-3 mt-6">
      <Button
        block
        color="currentColor"
        aria-label="Login with Google"
        layout="outline"
        icon={() => <Icon as={FaGoogle} />}
        onClick={() => socialAuth(Provider.Google, mutate)}
      />
      <Button
        block
        color="currentColor"
        layout="outline"
        aria-label="Login with Github"
        icon={() => <Icon as={FaGithub} />}
        onClick={() => socialAuth(Provider.GitHub, mutate)}
      />
    </div>
  </>
));

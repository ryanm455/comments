import { memo } from "react";

import Icon from "components/Icon";
import { Button } from "components/ui/Button";
import { socialAuth } from "lib/login";
import { mutate } from "swr";

import { Provider } from "@prisma/client";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";

import { DividerWithText } from "./DividerWithText";

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
        onClick={() => socialAuth(Provider.GOOGLE, mutate)}
      />
      <Button
        block
        color="currentColor"
        layout="outline"
        aria-label="Login with Github"
        icon={() => <Icon as={FaGithub} />}
        onClick={() => socialAuth(Provider.GITHUB, mutate)}
      />
    </div>
  </>
));

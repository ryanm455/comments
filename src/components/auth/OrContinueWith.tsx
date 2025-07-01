"use client"
import { useState } from "react";

import { Button } from "components/ui/Button";
import Icon from "components/ui/Icon";
import { useRouter } from "next/navigation";
import NewWindow from "react-new-window";

import type { ProviderId } from "@auth/core/providers";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";

import { DividerWithText } from "./DividerWithText";

type Props = {
  callbackUrl?: string
}

export const OrContinueWith = ({ callbackUrl = "/" }: Props) => {
  const [popupMethod, setPopUpMethod] = useState<ProviderId | null>();
  const router = useRouter();

  return (
    <>
      <DividerWithText className="mt-6">or continue with</DividerWithText>
      <div className="flex gap-3 mt-6">
        <Button
          block
          color="currentColor"
          aria-label="Login with Google"
          layout="outline"
          icon={() => <Icon as={FaGoogle} />}
          onClick={() => setPopUpMethod("google")}
        />
        <Button
          block
          color="currentColor"
          layout="outline"
          aria-label="Login with Github"
          icon={() => <Icon as={FaGithub} />}
          onClick={() => setPopUpMethod("github")}
        />
      </div>
      {popupMethod && (
        <NewWindow url={`/auth/popup/${popupMethod}?callbackUrl=/auth/popup/success`} onUnload={() => {
          setPopUpMethod(null);
          router.push(callbackUrl);
        }} />
      )}
    </>
  );
}
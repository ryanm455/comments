import { useState } from "react";

import classNames from "classnames";
import { Button } from "components/ui/Button";
import ProviderIcon from "components/ui/ProviderIcon";
import { providerReadable } from "lib/utils";
import { useSession } from "next-auth/react";
import NewWindow from "react-new-window";

import { ProviderId } from "@auth/core/providers";
import { Provider } from "@prisma/client";

export type EmbedLoginProps = {
  authMethods: Provider[];
  className?: string;
}

const findKey = (o: { [k: string]: string }, v: string) => Object.keys(o).find(k => o[k] === v);

const EmbedLogin = ({ authMethods, className }: EmbedLoginProps) => {
  const [popupMethod, setPopUpMethod] = useState<ProviderId | null>();
  const { update } = useSession();
  return (
    <div className={classNames("flex flex-col md:flex-row gap-2", className)}>
      {authMethods.map(e => {
        const Icon = () => <ProviderIcon i={e} />;

        return (
          <Button
            key={e}
            iconLeft={Icon}
            onClick={() => setPopUpMethod(e.toLowerCase())}
            className="gap-2"
          >
            Login with{" "}
            {providerReadable(findKey(Provider, e) as Provider)}
          </Button>
        );
      })}
      {popupMethod && (
        <NewWindow url={`/auth/popup/${popupMethod}?callbackUrl=/auth/popup/success`} onUnload={() => {
          setPopUpMethod(null);
          update();
        }} />
      )}
    </div>
  );
}

export default EmbedLogin;

import { FC, memo } from "react";

import ProviderIcon from "components/ProviderIcon";
import { Button } from "components/ui/Button";
import { socialAuth } from "lib/login";
import { findKey } from "lodash-es";
import { providerReadable } from "utils";

import { Provider } from "@prisma/client";

const Login: FC<{
  authMethod: Provider[];
  mutate: any;
}> = memo(({ authMethod, mutate }) => (
  <div className="flex flex-col md:flex-row gap-2">
    {authMethod.map(e => {
      const Icon = () => <ProviderIcon i={e} />;

      return (
        <Button
          key={e}
          iconLeft={Icon}
          onClick={() => socialAuth(e, mutate)}
          className="gap-2"
        >
          Login with{" "}
          {providerReadable(findKey(Provider, v => v === e) as Provider)}
        </Button>
      );
    })}
  </div>
));

export default Login;

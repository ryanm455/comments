import ProviderIcon from "components/ProviderIcon";
import { socialAuth } from "lib/login";
import { findKey } from "lodash-es";
import { FC, memo } from "react";
import { Provider } from "types/db";

import { Button } from "@windmill/react-ui";

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
          Login with {findKey(Provider, v => v === e)}
        </Button>
      );
    })}
  </div>
));

export default Login;

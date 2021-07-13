import Icon from "components/ProviderIcon";
import { socialAuth } from "lib/login";
import { findKey } from "lodash-es";
import { FC, memo } from "react";
import { Provider } from "types/db";

import { Button, Flex, Icon as CIcon } from "@chakra-ui/react";

const Login: FC<{
  authMethod: Provider[];
  mutate: any;
}> = memo(function Login({ authMethod, mutate }) {
  return (
    <Flex flexDir={{ base: "column", md: "row" }} gridGap={2}>
      {authMethod.map(e => (
        <Button
          key={e}
          leftIcon={<CIcon i={e} as={Icon} />}
          onClick={() => socialAuth(e, mutate)}
        >
          Login with {findKey(Provider, v => v === e)}
        </Button>
      ))}
    </Flex>
  );
});

export default Login;

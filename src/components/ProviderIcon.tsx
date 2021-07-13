import { FaEnvelope, FaGithub, FaGoogle } from "react-icons/fa";
import { Provider } from "types/db";

import { ComponentWithAs, Icon as CIcon, IconProps } from "@chakra-ui/react";

const Icon: ComponentWithAs<"svg", IconProps & { i: Provider }> = ({
  i,
  ...props
}) => {
  switch (i) {
    case Provider.GitHub:
      return <CIcon as={FaGithub} {...props} />;
    case Provider.Google:
      return <CIcon as={FaGoogle} {...props} />;
    case Provider.Local:
      return <CIcon as={FaEnvelope} {...props} />;
    default:
      return <></>;
  }
};

export default Icon;

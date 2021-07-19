import Icon from "components/Icon";
import { FaEnvelope, FaGithub, FaGoogle } from "react-icons/fa";
import { Provider } from "types/db";

import type { FC, HTMLProps } from "react";

type Props = Omit<HTMLProps<HTMLImageElement>, "as"> & { i: Provider };

const ProviderIcon: FC<Props> = ({ i, ...props }) => {
  switch (i) {
    case Provider.GitHub:
      return <Icon as={FaGithub} {...props} />;
    case Provider.Google:
      return <Icon as={FaGoogle} {...props} />;
    case Provider.Local:
      return <Icon as={FaEnvelope} {...props} />;
    default:
      throw new Error(`Icon ${i} does not exist yet.`);
  }
};

export default ProviderIcon;

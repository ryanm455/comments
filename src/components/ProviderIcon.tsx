import type { FC, HTMLProps } from "react";

import Icon from "components/Icon";
import { FaEnvelope, FaGithub, FaGoogle } from "react-icons/fa";

import { Provider } from "@prisma/client";

type Props = Omit<HTMLProps<HTMLImageElement>, "as"> & { i: Provider };

const ProviderIcon: FC<Props> = ({ i, ...props }) => {
  switch (i) {
    case Provider.GITHUB:
      return <Icon as={FaGithub} {...props} />;
    case Provider.GOOGLE:
      return <Icon as={FaGoogle} {...props} />;
    case Provider.LOCAL:
      return <Icon as={FaEnvelope} {...props} />;
    default:
      throw new Error(`Icon ${i} does not exist yet.`);
  }
};

export default ProviderIcon;

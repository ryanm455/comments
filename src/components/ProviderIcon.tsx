import type {
  FC,
  HTMLProps,
} from "react";

import Icon from "components/Icon";

import { Provider } from "@prisma/client";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";

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

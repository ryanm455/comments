import { useMemo } from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { shadeColor } from "./utils";

import type { ISettings } from "types/embed";

const EmbedLayout: React.FC<{ settings: ISettings }> = ({
  children,
  settings: { primaryColor, errorColor },
}) => {
  const primaryDarker = useMemo(
    () => shadeColor(primaryColor, -20),
    [primaryColor]
  );

  const theme = extendTheme({
    colors: {
      blue: {
        500: primaryColor,
        600: primaryDarker,
      },
      red: {
        500: errorColor,
      },
    },
    styles: {
      global: () => ({
        "body::-webkit-scrollbar": {
          display: "none",
        },
      }),
    },
  });

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default EmbedLayout;

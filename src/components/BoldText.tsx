import { memo } from "react";

import { Box, ChakraComponent } from "@chakra-ui/react";

const BoldText: ChakraComponent<"div", {}> = props => (
  <Box
    as="span"
    color="transparent"
    bgClip="text"
    bgImage="linear-gradient(to right, #10b981, #6366f1, rgb(59,130,246));"
    {...props}
  />
);

export default memo(BoldText);

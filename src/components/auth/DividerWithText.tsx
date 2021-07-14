import { memo } from "react";

import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const DividerWithText = ({ children, ...flexProps }: FlexProps) => (
  <Flex align="center" color="gray.300" {...flexProps}>
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
    <Text
      as="span"
      px="3"
      color={useColorModeValue("gray.600", "gray.400")}
      fontWeight="medium"
    >
      {children}
    </Text>
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
  </Flex>
);

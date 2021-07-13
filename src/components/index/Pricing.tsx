import {
  Box,
  chakra,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { Card } from "components/auth/Card";
import B from "components/BoldText";
import LinkWrap from "components/LinkWrap";

const Pricing = () => (
  <Flex w="full" p={50} alignItems="center" justifyContent="center">
    <Card
      as={Box}
      maxW="7xl"
      px={4}
      py={20}
      mx="auto"
      w={["full", "60%"]}
      textAlign={{ base: "left", md: "center" }}
    >
      <Text
        mb={2}
        fontSize="5xl"
        fontWeight={["bold", "extrabold"]}
        lineHeight="tight"
      >
        $9
        <chakra.span
          fontSize="2xl"
          fontWeight="medium"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {" "}
          per <B>month</B> for businesses
        </chakra.span>
      </Text>
      <chakra.p
        mb={6}
        fontSize={{ base: "sm", sm: "lg", md: "xl" }}
        color={useColorModeValue("gray.600", "gray.400")}
      >
        Otherwise completely <B>free</B> for hobbyists and students.
      </chakra.p>
      <Flex
        alignItems="center"
        gridGap={2}
        justifyContent="center"
        flexDir={{ base: "column", md: "row" }}
      >
        <Button colorScheme="blue" as={LinkWrap} href="/signup">
          Get started
        </Button>
        <Button>Contact Us</Button>
      </Flex>
    </Card>
  </Flex>
);

export default Pricing;

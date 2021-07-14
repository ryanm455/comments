/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import LinkWrap from "components/LinkWrap";
import { useUser } from "lib/hooks";
import { APP_LOGO } from "meta";
import { memo, FC } from "react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";

const NAV_LINKS = [
  {
    text: "Home",
    href: "/",
  },
];

const ThemeToggle: FC = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={<Icon as={colorMode === "light" ? FaMoon : FaSun} />}
      onClick={toggleColorMode}
      aria-label="Toggle theme"
    />
  );
});

ThemeToggle.whyDidYouRender = false;

const Navbar: FC = memo(() => {
  const [user] = useUser();

  const customUser = user
    ? [
        <IconButton
          key="dash-btn"
          as={LinkWrap}
          aria-label="View profile"
          href="/dashboard"
          icon={<Icon as={FaUser} />}
        />,
      ]
    : [
        <Button key="signup-btn" as={LinkWrap} href="/signup">
          Sign Up
        </Button>,
        <Button as={LinkWrap} href="/login" key="login-btn" colorScheme="green">
          Login
        </Button>,
      ];

  return (
    <Box
      pos="sticky"
      top={0}
      zIndex={50}
      bg={useColorModeValue(
        "rgba(255, 255, 255, 0.6)",
        "rgba(26, 32, 44, 0.6)"
      )}
      px={8}
      py={6}
      backdropFilter="saturate(180%) blur(20px)"
    >
      <Flex as="nav" maxW="4xl" justify="space-between" mx="auto">
        <Flex alignItems="center">
          <Heading as="h1" size="md" mr={{ base: 4, sm: 10 }}>
            {APP_LOGO}
          </Heading>
          <Flex as="ul" alignItems="center" listStyleType="none">
            {NAV_LINKS.map(e => (
              <Box
                key={e.text}
                as="li"
                p={{ base: 1, sm: 4 }}
                color={useColorModeValue("gray.900", "gray.100")}
                fontWeight="semibold"
              >
                <LinkWrap href={e.href}>{e.text}</LinkWrap>
              </Box>
            ))}
          </Flex>
        </Flex>
        <Flex as="ul" alignItems="center" listStyleType="none">
          {[<ThemeToggle key="theme-btn" />, ...customUser].map((e, idx) => (
            <Box
              key={idx}
              as="li"
              py={{ base: 1, sm: 4 }}
              px={{ base: 1, sm: 2 }}
            >
              {e}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
});

Navbar.whyDidYouRender = false;

export default Navbar;

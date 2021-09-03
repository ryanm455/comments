import { FC, memo } from "react";

import Icon from "components/Icon";
import LinkWrap from "components/LinkWrap";
import { Button } from "components/ui/Button";
import { useUser } from "lib/hooks";
import { APP_LOGO } from "meta";
import { useTheme } from "next-themes";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";

const NAV_LINKS = [
  {
    text: "Home",
    href: "/",
  },
];

const ThemeToggle: FC = memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      icon={() =>
        theme === "light" ? <Icon as={FaMoon} /> : <Icon as={FaSun} />
      }
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    />
  );
});

const Navbar: FC = memo(() => {
  const [user] = useUser();

  const customUser = user
    ? [
        <Button
          key="dash-btn"
          tag={LinkWrap}
          aria-label="View profile"
          href="/dashboard"
          icon={() => <Icon as={FaUser} />}
        />,
      ]
    : [
        <Button key="signup-btn" tag={LinkWrap} href="/signup">
          Sign Up
        </Button>,
        <Button tag={LinkWrap} href="/login" key="login-btn" layout="green">
          Login
        </Button>,
      ];

  return (
    <div className="sticky top-0 z-30 px-8 py-6 backdrop-filter backdrop-saturate-[180%] backdrop-blur-[20px] bg-opacity-60 bg-white dark:bg-gray-800 dark:bg-opacity-60">
      <nav className="flex max-w-4xl justify-between mx-auto">
        <div className="flex items-center">
          <h1 className="text-md text-xl mr-4 sm:mr-10">{APP_LOGO}</h1>
          <ul className="flex items-center">
            {NAV_LINKS.map(e => (
              <li
                key={e.text}
                className="p-1 sm:p-4 text-gray-900 dark:text-gray-100 font-semibold"
              >
                <LinkWrap href={e.href}>{e.text}</LinkWrap>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex items-center">
          {[<ThemeToggle key="theme-btn" />, ...customUser].map((e, idx) => (
            <li key={idx} className="py-1 px-1 sm:py-4 sm:px-2">
              {e}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default Navbar;

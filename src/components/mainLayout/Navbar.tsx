import { memo } from "react";

import LinkWrap from "components/ui/LinkWrap";
import { APP_LOGO } from "lib/meta";

import NavBtn from "./NavBtn";

const NAV_LINKS = [
  {
    text: "Home",
    href: "/",
  },
];

const Navbar = memo(() => (
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
      <NavBtn />
    </nav>
  </div>
));

export default Navbar;

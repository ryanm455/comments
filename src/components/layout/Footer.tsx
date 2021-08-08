import { memo, ReactNode } from "react";

import { APP_LOGO, APP_NAME } from "meta";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => (
  <a
    className="rounded-full w-8 h-8 cursor-pointer inline-flex items-center justify-center bg-blackAlpha-100 dark:bg-whiteAlpha-100 hover:bg-blackAlpha-200 dark:hover:bg-whiteAlpha-200 transition-colors ease-in-out duration-300"
    href={href}
    aria-label={label}
  >
    {children}
  </a>
);

const Footer = memo(() => (
  <div className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
    <div className="container mx-auto flex max-w-4xl py-4 px-8 flex-col md:flex-row gap-4 justify-center md:justify-between items-center">
      <p>{APP_LOGO}</p>
      <p>
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved
      </p>
      <div className="flex gap-6">
        <SocialButton label="Twitter" href="#">
          <FaTwitter />
        </SocialButton>
        <SocialButton label="YouTube" href="#">
          <FaYoutube />
        </SocialButton>
        <SocialButton label="Instagram" href="#">
          <FaInstagram />
        </SocialButton>
      </div>
    </div>
  </div>
));

export default Footer;

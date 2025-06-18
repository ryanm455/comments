"use client"

import { Button } from "components/ui";
import Icon from "components/ui/Icon";
import LinkWrap from "components/ui/LinkWrap";
import { useSession } from "next-auth/react";

import { FaUser } from "@react-icons/all-files/fa/FaUser";

import ThemeToggle from "./ThemeToggle";

const NavBtn = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const authBtns = isAuthenticated
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
      <Button key="signup-btn" tag={LinkWrap} href="/auth/signup">
        Sign Up
      </Button>,
      <Button tag={LinkWrap} href="/auth/login" key="login-btn" layout="green">
        Login
      </Button>,
    ];

  return (
    <ul className="flex items-center">
      {[<ThemeToggle key="theme-btn" />, ...authBtns].map((e, idx) => (
        <li key={idx} className="py-1 px-1 sm:py-4 sm:px-2">
          {e}
        </li>
      ))}
    </ul>
  )
}

export default NavBtn;
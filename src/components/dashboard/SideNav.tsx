"use client"
import { memo } from "react";

import classNames from "classnames";
import Icon from "components/ui/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconType } from "@react-icons/all-files";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import { FaStore } from "@react-icons/all-files/fa/FaStore";

export type SideNavLinkProps = {
  title: string;
  href: string;
  icon: IconType;
};

const links: SideNavLinkProps[] = [
  { title: "Sites", href: "/dashboard", icon: FaStore },
  { title: "Comments", href: "/dashboard/comments", icon: FaComment },
  { title: "Upvoted", href: "/dashboard/upvotes", icon: FaArrowUp },
  { title: "Downvoted", href: "/dashboard/downvotes", icon: FaArrowDown },
];

export const SideNav = memo(() => {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-80 side-nav bg-gray-50 dark:bg-gray-900 overflow-auto">
      <ul className="flex md:block">
        {links.map((e: SideNavLinkProps) => (
          <li key={e.href}>
            <Link href={e.href} className={classNames(
              "inline-flex items-center md:flex rounded-[10px] m-[10px] p-[10px] font-medium cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700",
              pathname === e.href
                ? "bg-gray-300 dark:bg-gray-700"
                : "bg-gray-100 dark:bg-gray-800"
            )}
            >
              <Icon as={e.icon} className="mr-2" /> {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

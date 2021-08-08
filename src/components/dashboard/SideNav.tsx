import { memo } from "react";

import classNames from "classnames";
import Icon from "components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";

type LinkProps = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  links: LinkProps[];
};

export const SideNav: React.FC<Props> = memo(({ links }) => {
  const router = useRouter();

  return (
    <div className="w-full md:w-80 side-nav bg-gray-50 dark:bg-gray-900 overflow-auto">
      <ul className="flex md:block">
        {links.map((e: LinkProps) => (
          <li key={e.href}>
            <Link href={e.href} passHref>
              <a
                className={classNames(
                  "inline-flex items-center md:flex rounded-[10px] m-[10px] p-[10px] font-medium cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700",
                  router.pathname === e.href
                    ? "bg-gray-300 dark:bg-gray-700"
                    : "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Icon as={e.icon} className="mr-2" /> {e.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

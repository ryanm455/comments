import { useEffect } from "react";

import Layout from "components/layout";
import { useUser } from "lib/hooks";
import Router from "next/router";
import { FaArrowDown, FaArrowUp, FaComment, FaStore } from "react-icons/fa";

import { User } from "@prisma/client";

import { SideNav } from "./SideNav";

const links = [
  { title: "Sites", href: "/dashboard", icon: FaStore },
  { title: "Comments", href: "/dashboard/comments", icon: FaComment },
  { title: "Upvoted", href: "/dashboard/upvotes", icon: FaArrowUp },
  { title: "Downvoted", href: "/dashboard/downvotes", icon: FaArrowDown },
];

export const DashLayout: React.FC<{ user: User }> = ({ children, user: u }) => {
  const [user] = useUser(u);

  useEffect(() => {
    // redirect to home if user is authenticated
    if (!user) Router.push("/");
  }, [user, u]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <SideNav links={links} />
        <div className="w-full overflow-auto container px-4 mx-auto mb-7 max-w-5xl">
          {children}
        </div>
      </div>
    </Layout>
  );
};

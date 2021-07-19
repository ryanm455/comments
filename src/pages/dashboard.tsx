import Boxes from "components/Box";
import { useUser } from "lib/hooks";
import middleware from "middleware";
import Router from "next/router";
import { FC, useEffect } from "react";
import { parse, redirect } from "utils";

import type { GetServerSideProps } from "next";
import type { ISite } from "types/db";

const Dashboard: FC<{ sites: ISite[] }> = ({ sites }) => {
  const [user] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (!user) Router.push("/");
  }, [user]);

  return (
    <div className="container px-4 mx-auto mb-7 max-w-5xl">
      <Boxes data={sites} name="site" header="Sites" headCenter />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  const sites = (await req.user.populate("sites").execPopulate()).sites;

  return {
    props: {
      sites: parse(sites),
    },
  };
};

export default Dashboard;

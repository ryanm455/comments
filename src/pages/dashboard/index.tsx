import { FC, useCallback, useState } from "react";

import Boxes from "components/Box";
import { DashLayout } from "components/dashboard/DashLayout";
import prisma from "lib/prisma";
import middleware from "middleware";
import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";
import { parse, redirect } from "server-utils";

import type { Site, User } from "@prisma/client";

const InitModelWithName = dynamic(() => import("components/InitModelWithName"));

type Props = {
  sites: Site[];
  user: User & {
    downvoted: {
      id: string;
    }[];
    upvoted: {
      id: string;
    }[];
  };
};

const Dashboard: FC<Props> = ({ sites }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const createSite = useCallback(
    v =>
      fetch("/api/site", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(v),
      })
        .then(r => r.json())
        .then(r => Router.push(`/dashboard/site/${r.site.id}`)),
    []
  );

  return (
    <>
      <Boxes data={sites} name="site" header="Sites" add={openModal} />
      <InitModelWithName
        header="Add Site"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={createSite}
      />
    </>
  );
};

Dashboard.getLayout = (page: typeof Dashboard, { user }: Props) => (
  <DashLayout user={user}>{page}</DashLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  const sites = await prisma.site.findMany({
    where: { authorId: req.user.id },
  });

  return {
    props: {
      sites,
      user: parse(req.user),
    },
  };
};

export default Dashboard;

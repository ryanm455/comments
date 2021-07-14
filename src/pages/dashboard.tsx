import Boxes from "components/Box";
import { useUser } from "lib/hooks";
import db from "middleware/db";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import Router from "next/router";
import { FC, useEffect } from "react";
import { ApiRequest } from "types/custom-req";
import { parse, redirect } from "utils";

import { Container } from "@chakra-ui/react";

import type { ISite } from "types/db";

const Dashboard: FC<{ sites: ISite[] }> = ({ sites }) => {
  const [user] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push("/");
  }, [user]);

  return (
    <Container mb={7} maxW="5xl">
      <Boxes data={sites} name="site" header="Sites" headCenter />
    </Container>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext & { req: ApiRequest }) => {
  const handler = nc().use(db);

  try {
    await handler.run(req, res);
  } catch (e) {}

  if (!req.user) return redirect("/login");

  const sites = (await req.user.populate("sites").execPopulate()).sites;

  return {
    props: {
      sites: parse(sites),
    },
  };
};

export default Dashboard;

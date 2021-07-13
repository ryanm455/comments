import Boxes from "components/Box";
import db from "middleware/db";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import { FC } from "react";
import { ApiRequest } from "types/custom-req";

import { Container } from "@chakra-ui/react";

import type { ISite } from "types/db";
import { redirect, parse } from "utils";

const Dashboard: FC<{ sites: ISite[] }> = ({ sites }) => (
  <Container mb={7} maxW="5xl">
    <Boxes data={sites} name="site" header="Sites" headCenter />
  </Container>
);

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

import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(middleware).post((req, res) => {
  throw new Error("Deprecated");
});

export default handler;

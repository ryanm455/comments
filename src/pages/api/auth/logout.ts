import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(middleware).get((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;

import middleware from "middleware";
import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(middleware).get((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;

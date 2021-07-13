import db from "middleware/db";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler.use(db).get((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;

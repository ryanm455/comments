import passport from "lib/passport";
import middleware from "middleware";
import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get(passport.authenticate("google", { scope: ["profile"] }));

export default handler;

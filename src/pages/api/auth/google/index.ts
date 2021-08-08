import passport from "lib/passport";
import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get(passport.authenticate("google", { scope: ["profile"] }));

export default handler;

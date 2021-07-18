import passport from "lib/passport";
import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/api/auth/after")
  );

export default handler;

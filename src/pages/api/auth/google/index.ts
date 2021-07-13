import passport from "lib/passport";
import db from "middleware/db";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(db).get(passport.authenticate("google", { scope: ["profile"] }));

export default handler;

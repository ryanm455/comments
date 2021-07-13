import passport from "lib/passport";
import db from "middleware/db";
import type { NextApiResponse } from "next";
import nextConnect from "next-connect";
import type { ApiRequest } from "types/custom-req";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler.use(db).post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

export default handler;

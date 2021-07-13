import db from "middleware/db";
import { UserModel } from "models";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";
import { IUser } from "types/db";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler.use(db).post(async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name)
    return res.status(400).send("Missing fields");

  const user = new UserModel({ username, name, password, provider: "local" });

  await user.save();

  req.logIn(user, (err: any) => {
    if (err) throw err;

    res.status(201).json({
      user,
    });
  });
});

export default handler;

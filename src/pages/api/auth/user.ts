import middleware from "middleware";
import { UserModel } from "models";
import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    // const { name, username, favoriteColor } = req.user
    // res.json({ user: { name, username, favoriteColor } })
    res.json({ user: req.user });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    const { name } = req.body;
    req.user!.name = name;
    await req.user?.save();

    res.json({ user: req.user });
  })
  .delete(async (req, res) => {
    await UserModel.deleteOne({ _id: req.user!._id });
    req.logOut();
    res.status(204).end();
  });

export default handler;

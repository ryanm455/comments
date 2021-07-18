import middleware from "middleware";
import { SiteModel } from "models";
import UserModel from "models/User";
import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  })
  .post(async (req, res) => {
    const {
      name,
      errorColor,
      primaryColor,
      authIcons,
      timestamps,
      ratings,
      providers,
    } = req.body;

    const site = new SiteModel({
      name,
      errorColor,
      primaryColor,
      authIcons,
      timestamps,
      ratings,
      providers,
    });

    const [_, user] = await Promise.all([
      site.save(),
      UserModel.findById(req!.user!._id).populate("sites"),
    ]);

    if (!user) throw new Error("the impossible has occurred");

    user.sites!.push(site._id);

    await user.save();

    res.json({ site });
  });

export default handler;

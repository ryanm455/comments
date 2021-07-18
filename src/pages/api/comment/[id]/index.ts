import middleware from "middleware";
import { PageModel } from "models";
import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get(async (req, res) => {
    res.json({
      comments: (
        await PageModel.findById(req.query.id).lean().populate("comments")
      )?.comments,
    });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  });

export default handler;

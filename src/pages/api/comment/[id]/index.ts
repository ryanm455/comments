import db from "middleware/db";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";
import { PageModel } from "models";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler
  .use(db)
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

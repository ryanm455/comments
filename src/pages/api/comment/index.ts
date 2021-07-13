import db from "middleware/db";
import { CommentModel, PageModel, SiteModel } from "models";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler
  .use(db)
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
    const { text, rating, pageId, commentId } = req.body;

    const comment = new CommentModel({
      text,
      rating,
      author: req.user?._id,
    });

    await comment.save();

    if (pageId) {
      const page = await PageModel.findById(pageId);

      page?.comments?.push(comment._id);

      await page?.save();
    } else if (commentId) {
      const rootComment = await CommentModel.findById(commentId);

      rootComment?.children?.push(comment._id);

      await rootComment?.save();
    }

    res.json({ comment });
  });

export default handler;

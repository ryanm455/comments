import middleware from "middleware";
import { CommentModel, PageModel } from "models";
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

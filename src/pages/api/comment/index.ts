import prisma from "lib/prisma";
import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

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

    const comment = await prisma.comment.create({
      data: {
        text,
        rating,
        authorId: req.user!.id,
        pageId,
        parentCommentId: commentId,
      },
      include: {
        author: { select: { name: true, provider: true } },
        children: true,
      },
    });

    res.json({ comment });
  });

export default handler;

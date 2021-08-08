import prisma from "lib/prisma";
import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(middleware)
  .get(async (req, res) =>
    res.json({
      comments: await prisma.comment.findMany({
        where: { pageId: req.query.id.toString() },
        include: {
          author: { select: { name: true, provider: true } },
          children: true,
        },
      }),
    })
  )
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

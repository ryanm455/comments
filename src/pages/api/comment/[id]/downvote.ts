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
  .get(async (req, res) => {
    const id = req.query.id.toString();

    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
    });

    if (!user) return res.status(404).end("not found");

    let data = {};

    if (user.downvotedIds.includes(id)) {
      // already downvoted
      data = {
        downvoted: {
          disconnect: { id },
        },
      };
    } else if (user.upvotedIds.includes(id)) {
      // upvoted so remove
      data = {
        upvoted: {
          disconnect: { id },
        },
        downvoted: {
          connect: { id },
        },
      };
    } else {
      data = {
        downvoted: {
          connect: { id },
        },
      };
    }

    const newUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
    const comment = await prisma.comment.findUnique({ where: { id } });

    res.json({
      user: newUser,
      comment,
      success: true,
    });
  });

export default handler;

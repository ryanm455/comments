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
  .post(async ({ body, user }, res) => {
    const {
      name,
      errorColor,
      primaryColor,
      authIcons,
      timestamps,
      ratings,
      providers,
    } = body;

    const site = await prisma.site.create({
      data: {
        name,
        errorColor,
        primaryColor,
        authIcons,
        timestamps,
        ratings,
        providers,
        authorId: user!.id,
      },
    });

    res.json({ site });
  });

export default handler;

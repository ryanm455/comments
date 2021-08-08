import prisma from "lib/prisma";
import middleware from "middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

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

    const user = await prisma.user.update({
      data: { name },
      where: { id: req.user?.id },
      include: {
        downvoted: true,
        upvoted: true,
      },
    });

    res.json({ user });
  })
  .delete(async (req, res) => {
    await prisma.user.delete({ where: { id: req.user!.id } });
    req.logOut();
    res.status(204).end();
  });

export default handler;

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
  .get(async ({ query: { id } }, res) => {
    res.json({
      page: await prisma.page.findUnique({ where: { id: id.toString() } }),
    });
  })
  .put(async ({ query: { id }, body: { name } }, res) => {
    const page = await prisma.page.update({
      where: { id: id.toString() },
      data: { name },
    });

    res.json({ page });
  });

export default handler;

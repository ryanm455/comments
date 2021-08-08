import prisma from "lib/prisma";
import { identity, pickBy } from "lodash-es";
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
      site: await prisma.site.findUnique({ where: { id: id.toString() } }),
    });
  })
  .put(async ({ query: { id }, body }, res) => {
    const site = await prisma.site.update({
      where: { id: id.toString() },
      data: pickBy(body, identity),
    });

    res.json({ site });
  });

export default handler;

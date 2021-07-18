import middleware from "middleware";
import { SiteModel, PageModel } from "models";
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
    const { name, ref } = req.body;

    const site = await SiteModel.findById(ref);

    if (!site) throw new Error("Site not found!");

    const page = new PageModel({
      name,
    });

    await page.save();

    site.pages!.push(page._id);

    await site.save();

    res.json({ page });
  });

export default handler;

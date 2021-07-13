import { identity, pickBy } from "lodash-es";
import db from "middleware/db";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";
import { PageModel } from "models";

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
  .get(async (req, res) => {
    res.json({ page: await PageModel.findById(req.query.id).lean() });
  })
  .put(async (req, res) => {
    const { name } = req.body;

    const page = await PageModel.findByIdAndUpdate(
      req.query.id,
      pickBy(
        {
          name,
        },
        identity
      )
    ).lean();

    res.json({ page });
  });

export default handler;

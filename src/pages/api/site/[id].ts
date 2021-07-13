import { identity, pickBy } from "lodash-es";
import db from "middleware/db";
import nextConnect from "next-connect";

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";
import { SiteModel } from "models";

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
    res.json({ site: await SiteModel.findById(req.query.id).lean() });
  })
  .put(async (req, res) => {
    const {
      name,
      errorColor,
      primaryColor,
      authIcons,
      timestamps,
      ratings,
      providers,
    } = req.body;

    const site = await SiteModel.findByIdAndUpdate(
      req.query.id,
      pickBy(
        {
          name,
          errorColor,
          primaryColor,
          authIcons,
          timestamps,
          ratings,
          providers,
        },
        identity
      )
    ).lean();

    res.json({ site });
  });

export default handler;

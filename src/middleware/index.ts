import passport from "lib/passport";
import nc from "next-connect";

import { db } from "./db";
import { session } from "./session";

import type { NextApiRequest, NextApiResponse } from "next";

const middleware = nc<NextApiRequest, NextApiResponse>()
  .use(db)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;

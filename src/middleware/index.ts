import passport from "lib/passport";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { session } from "./session";

const middleware = nc<NextApiRequest, NextApiResponse>()
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;

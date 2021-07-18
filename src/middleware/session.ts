import connectMongo from "connect-mongo";
import s from "express-session";
import { connection } from "mongoose";

import type { NextApiRequest, NextApiResponse } from "next";

const MongoStore = connectMongo(s);

export const session = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const store = new MongoStore({
    mongooseConnection: connection,
    stringify: false,
  });

  return s({
    secret: process.env.TOKEN_SECRET!,
    resave: false,
    saveUninitialized: false,
    store,
  })(req as any, res as any, next);
};

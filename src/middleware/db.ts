import MongoStore from "connect-mongo";
import session from "express-session";
import dbConnect from "lib/dbConnect";
import passport from "lib/passport";
import mongoose, { connect } from "mongoose";
import nextConnect from "next-connect";

import type { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const clientPromise: Promise<MongoClient> =
  mongoose.connection.readyState === 0
    ? dbConnect().then(m => m.connection.getClient())
    : new Promise(r => r(mongoose.connection.getClient()));

const db = nextConnect<NextApiRequest, NextApiResponse>()
  .use(
    session({
      secret: process.env.TOKEN_SECRET!,
      saveUninitialized: false,
      resave: false,
      store:
        process.env.NODE_ENV === "production"
          ? MongoStore.create({ clientPromise })
          : undefined,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        secure: process.env.NODE_ENV === "production",
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session());

export default db;

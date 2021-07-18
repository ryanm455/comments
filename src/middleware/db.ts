import dbConnect from "lib/dbConnect";

import { mongoose } from "@typegoose/typegoose";

import type { NextApiRequest, NextApiResponse } from "next";

export const db = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  if (mongoose.connection.readyState === 0) await dbConnect();

  next();
};

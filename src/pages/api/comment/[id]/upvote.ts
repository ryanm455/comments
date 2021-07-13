import db from 'middleware/db';
import { CommentModel, UserModel } from 'models';
import nextConnect from 'next-connect';

import type { NextApiResponse } from "next";
import type { ApiRequest } from "types/custom-req";

const handler = nextConnect<ApiRequest, NextApiResponse>();

handler.use(db).use((req, res, next) => {
  // handlers after this (PUT, DELETE) all require an authenticated user
  // This middleware to check if user is authenticated before continuing
  if (!req.user) {
    res.status(401).send("unauthenticated");
  } else {
    next();
  }
}).get(async (req, res) => {
  const comment = await CommentModel.findById(req.query.id)

  if (!comment) return res.status(404).end("not found");

  if (req.user!.upvoted?.includes(comment._id)) {
    // already upvoted
    req.user!.upvoted = req.user!.upvoted?.filter(e => e === comment._id)
    comment.upvotes -= 1;
    await Promise.all([req.user!.save(), comment.save()])
    return res.json({ success: true, msg: "removed vote", user: req.user, comment })
  } else if (req.user!.downvoted?.includes(comment._id)) {
    // downvoted so remove
    req.user!.downvoted = req.user!.downvoted?.filter(e => e === comment._id)
    comment.downvotes -= 1;
  }

  req.user!.upvoted?.push(comment._id)

  comment.upvotes += 1;

  await Promise.all([req.user!.save(), comment.save()])

  res.json({
    user: req.user,
    comment,
    success: true
  });
});

export default handler;

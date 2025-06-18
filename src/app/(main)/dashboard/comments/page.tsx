import React, { Suspense } from "react";

import Comment from "components/embed/Comment";
import { auth } from "lib/auth";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";

import type { Comment as IComment } from "@prisma/client";

const settings = { timestamps: true, ratings: false };

const getUser = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  return session.user!
}

const fetchUserComments = async (userId: string): Promise<IComment[]> => {
  const comments = await prisma.comment.findMany({
    where: { authorId: userId }
  });

  return comments;

}

const DashboardCommentThread = async () => {
  const user = await getUser();
  const comments = await fetchUserComments(user.id!);

  return comments.length ? (
    comments.map(c => (
      // @ts-ignore
      <Comment comment={{ ...c, author: user }} key={c.id} settings={settings} />
    ))
  ) : (
    <p className="text-gray-900 dark:text-gray-200 mb-4">
      You have not posted any comments.
    </p>
  );
}

const DashboardComments = () => (
  <>
    <h1 className="text-3xl mb-4 font-semibold">Your Comments</h1>
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardCommentThread />
    </Suspense>
  </>
);

export default DashboardComments;

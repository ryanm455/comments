"use server"

import { auth } from "lib/auth";
import prisma from "lib/prisma";

enum VoteType {
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE",
}

export async function loadReplyAction(parentId: string) {
    "use server"

    return await prisma.comment.findMany({
        where: { parentCommentId: parentId },
        include: { _count: { select: { children: true } }, author: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });
}


export async function voteAction(commentId: string, type: VoteType): Promise<number> {
  "use server";

  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated!");
  const userId = session.user.id;

  const [upvote, downvote] = await Promise.all([
    prisma.upvote.findUnique({ where: { userId_commentId: { userId, commentId } } }),
    prisma.downvote.findUnique({ where: { userId_commentId: { userId, commentId } } }),
  ]);

  let voteChange = 0;

  switch (type) {
    case VoteType.UPVOTE:
        if (upvote) return 0;

        if (downvote) {
        await prisma.downvote.delete({ where: { userId_commentId: { userId, commentId } } });
        voteChange += 1;
        }

        await prisma.upvote.create({ data: { userId, commentId } });
        voteChange += 1;
        break;
    case VoteType.DOWNVOTE:
        if (downvote) return 0;

        if (upvote) {
        await prisma.upvote.delete({ where: { userId_commentId: { userId, commentId } } });
        voteChange -= 1;
        }

        await prisma.downvote.create({ data: { userId, commentId } });
        voteChange -= 1;
        break;
    default:
        throw new Error("Vote type is broken: " + type + VoteType.UPVOTE);
  }

  if (voteChange !== 0) {
    await prisma.comment.update({
      where: { id: commentId },
      data: { votes: { increment: voteChange } },
    });
  }

  return voteChange;
}

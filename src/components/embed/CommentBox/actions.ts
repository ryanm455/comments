"use server"

import {
  auth,
  signIn,
} from "lib/auth";
import prisma from "lib/prisma";

export const signInAction = async (authMethod: string) => {
    "use server"
    await signIn(authMethod, { redirect: undefined })
}

export const addCommentAction = async (text: string, rating?: number, pageId?: string, parentId?: string) => {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated!")

    return await prisma.comment.create({
        data: {
            text,
            rating,
            pageId,
            parentCommentId: parentId,
            authorId: session.user.id
        },
        include: { author: true }
    }).then((c) => ({ ...c, _count: { children: 0 } }))
}
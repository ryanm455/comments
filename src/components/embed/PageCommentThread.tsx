import { Site } from "@prisma/client";
import { CommentThreadRoot } from "lib/commentStore";
import prisma from "lib/prisma";


const fetchRootCommentsForPage = async (pageId: string) => {
  return await prisma.comment.findMany({
    where: {
      parentComment: null, pageId
    },
    include: { _count: { select: { children: true } }, author: true },
    orderBy: { createdAt: 'desc' },
    take: 10, // cursor-based pagination is better for large threads
  });;
}


export const PageCommentThread = async ({ pageId, settings }: { pageId: string; settings: Partial<Site> }) => {
  const rootComments = await fetchRootCommentsForPage(pageId);

  return (
    <>
      <CommentThreadRoot
        initialComments={rootComments || []}
        settings={settings}
        pageId={pageId}
      />
    </>
  )
}
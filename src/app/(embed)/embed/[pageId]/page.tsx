import React, { Suspense } from "react";

import CommentBox from "components/embed/CommentBox";
import ExternalIcon from "components/embed/ExternalIcon";
import EmbedThemeStyling from "components/embed/ThemeStyling";
import { CommentThreadRoot } from "lib/commentStore";
import { APP_URL } from "lib/meta";
import prisma from "lib/prisma";
import { notFound } from "next/navigation";

import { Site } from "@prisma/client";

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

const fetchSite = async (pageId: string): Promise<Site | null> => {
  return await prisma.page.findUnique({
    where: { id: pageId },
    include: { site: true },
  }).then(s => s?.site || null);
}

const PageEmbed = async ({ params }: { params: Promise<{ pageId: string; }> }) => {
  const { pageId } = await params;

  const site = await fetchSite(pageId);
  if (!site) return notFound();


  return (
    <div className="w-full p-1">
      <div className="mb-6">
        <CommentBox pageId={pageId} settings={site} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PageCommentThread pageId={pageId} settings={site} />
      </Suspense>
      <a
        href={APP_URL}
        className="my-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Add comments to your site{" "}
        <ExternalIcon />
      </a>
      <EmbedThemeStyling primaryColor={site.primaryColor} errorColor={site.errorColor} />
    </div>
  );
};

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

export default PageEmbed;
import React, { Suspense } from "react";

import EmbedThemeStyling from "components/embed/ThemeStyling";
import { Button } from "components/ui/Button";
import Icon from "components/ui/Icon";
import { CommentThreadRoot } from "lib/commentStore";
import { APP_URL } from "lib/meta";
import prisma from "lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Site } from "@prisma/client";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";

type Props = {
  commentId: string;
  pageId: string;
};

const fetchSingleComment = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
    include: { _count: { select: { children: true } }, author: true },
  })
}

const fetchSite = async (pageId: string): Promise<Site | null> => {
  return await prisma.page.findUnique({
    where: { id: pageId },
    include: { site: true },
  }).then(s => s?.site || null);
}

const SingleCommentEmbed = async ({ params }: { params: Promise<Props> }) => {
  const { pageId, commentId } = await params;
  return (
    <div className="w-full p-1">
      <Link href={`/embed/${pageId}`}>
        <Button layout="link">
          ← return
        </Button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <SingleCommentThread pageId={pageId} commentId={commentId} />
      </Suspense>
      <a
        href={APP_URL}
        className="my-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Add comments to your site{" "}
        <Icon as={FaExternalLinkAlt} className="ml-[2px]" />
      </a>
    </div>
  );
}

const SingleCommentThread = async ({ pageId, commentId }: Props) => {
  const site = await fetchSite(pageId);
  const comment = await fetchSingleComment(commentId);

  if (!site || !comment) return notFound();

  return (
    <>
      <CommentThreadRoot initialComments={[comment]} settings={site} pageId={pageId} />
      <EmbedThemeStyling primaryColor={site.primaryColor} errorColor={site.errorColor} />
    </>
  )
}

export default SingleCommentEmbed;

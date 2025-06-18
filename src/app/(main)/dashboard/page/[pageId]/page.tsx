"use server"
import { Suspense } from "react";

import {
  fetchSite,
  PageCommentThread,
} from "app/(embed)/embed/[pageId]/page";
import { APP_URL } from "lib/meta";
import prisma from "lib/prisma";
import { notFound } from "next/navigation";

import PageForm from "./form";

export const fetchPage = async (pageId: string) => {
  return await prisma.page.findUnique({
    where: { id: pageId },
  });
};

const PagePage = async ({ params }: { params: Promise<{ pageId: string }> }) => {
  const { pageId } = await params;
  const page = await fetchPage(pageId);
  if (!page) return notFound();
  const site = await fetchSite(page.siteId);
  if (!site) return notFound();

  return (
    <>
      <PageForm
        page={page}
        pageId={pageId}
      />

      <h1 className="font-semibold text-3xl my-4">How To Add To Site</h1>

      <h2 className="font-semibold text-2xl my-4">React</h2>
      <code className="whitespace-pre">{`import { createRef } from "react";

export default function Embed() {
  const iframe = createRef();

  window.addEventListener(
    "message",
    e =>
      iframe.current &&
      e.data.height &&
      iframe.current.setAttribute("height", e.data.height)
  );

  return (
    <iframe
      ref={iframe}
      src="${APP_URL}/embed/${pageId}"
      width="100%"
      loading="lazy"
      onLoad={i => i.target.contentWindow.postMessage("height", "*")}
    />
  );
}`}</code>

      <h2 className="font-semibold text-2xl my-4">Javascript / HTML</h2>
      <code className="whitespace-pre">
        {`<iframe
  src="${APP_URL}/embed/${pageId}"
  width="100%"
  loading="lazy"
></iframe>

const iframe = document.querySelector("iframe");
iframe.onload = i => i.target.contentWindow.postMessage("height", "*");

window.addEventListener(
  "message",
  e => iframe.setAttribute("height", e.data.height)
);`}
      </code>

      <h1 className="font-semibold text-3xl my-4">Comments</h1>
      <Suspense fallback={<div>Loading comments...</div>}>
        <PageCommentThread pageId={pageId} settings={site} />
      </Suspense>
    </>
  );
};

export default PagePage;

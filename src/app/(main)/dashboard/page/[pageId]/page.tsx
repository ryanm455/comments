"use server"
import { Suspense } from "react";

import { PageCommentThread } from "components/embed/PageCommentThread";
import { APP_URL } from "lib/meta";
import prisma from "lib/prisma";
import { notFound } from "next/navigation";

import PageForm from "./form";

const fetchPageWithSite = async (pageId: string) => {
  return await prisma.page.findUnique({
    where: { id: pageId },
    include: { site: true }
  });
};

const PagePage = async ({ params }: { params: Promise<{ pageId: string }> }) => {
  const { pageId } = await params;
  const res = await fetchPageWithSite(pageId);
  if (!res) return notFound();
  const { site, ...page } = res;

  return (
    <>
      <PageForm
        page={page}
        pageId={pageId}
      />

      <h1 className="font-semibold text-3xl my-4">How To Add To Site</h1>

      <h2 className="font-semibold text-2xl my-4">React</h2>
      <code className="whitespace-pre">{`import { useEffect, useRef } from "react";

export default function Embed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data.type === "embed-height" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = \`\${e.data.height}px\`;
      }
    };

    window.addEventListener("message", handleMessage);

    const interval = setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage("request-embed-height", "*");
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="${APP_URL}/embed/${pageId}"
      width="100%"
      style={{ border: "none", height: "0px" }}
      loading="lazy"
    />
  );
}`}</code>

      <h2 className="font-semibold text-2xl my-4">Javascript / HTML</h2>
      <code className="whitespace-pre">
        {`<iframe
  src="${APP_URL}/embed/${pageId}"
  width="100%"
  style={{ border: "none", height: "0px" }}
  loading="lazy"
></iframe>

const iframe = document.querySelector("iframe");

const handleMessage = (e: MessageEvent) => {
  if (
    typeof e.data === "object" &&
    e.data.type === "embed-height"
  ) {
    iframe.style.height = \`\${e.data.height}px\`;
    }
  };

window.addEventListener("message", handleMessage);

const interval = setInterval(() => {
  iframe.contentWindow?.postMessage("request-embed-height", "*");
}, 1000);`}
      </code>

      <h1 className="font-semibold text-3xl my-4">Comments</h1>
      <Suspense fallback={<div>Loading comments...</div>}>
        <PageCommentThread pageId={pageId} settings={site} />
      </Suspense>
    </>
  );
};

export default PagePage;

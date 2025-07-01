"use client";

import { useEffect } from "react";

const EmbedListener = () => {
  useEffect(() => {
    const postHeight = () => {
      const height = document.body.scrollHeight;
      window.parent?.postMessage({ type: "embed-height", height }, "*");
    };

    const observer = new ResizeObserver(() => postHeight());
    observer.observe(document.body);

    const handleMessage = (e: MessageEvent) => e.data === "request-embed-height" && postHeight();

    window.addEventListener("message", handleMessage);
    postHeight();

    return () => {
      window.removeEventListener("message", handleMessage);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default EmbedListener;

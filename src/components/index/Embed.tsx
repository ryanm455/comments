"use client";

import { useEffect, useRef } from "react";

export default function Embed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data.type === "embed-height" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${e.data.height}px`;
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
      title="Example Comments"
      src="/embed/686446b233f85a69261e223b"
      width="100%"
      style={{ border: "none", height: "0px" }}
      loading="lazy"
      className="my-20 md:my-36"
    />
  );
}

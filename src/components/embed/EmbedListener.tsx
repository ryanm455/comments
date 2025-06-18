"use client"

import { useEffect } from "react";

const embedListener = (e: MessageEvent<any>) => {
  if (e.data == "height") {
    const [body, html] = [document.body, document.documentElement];

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // @ts-ignore
    e.source!.postMessage({ height }, "*");

    new ResizeObserver(entries =>
      // @ts-ignore
      e.source!.postMessage({ height: entries[0].target.clientHeight }, "*")
    ).observe(document.body);
  }
};

const EmbedListener = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("message", embedListener);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("message", embedListener);
            }
        };
    }, []);

    return null;
}

export default EmbedListener;
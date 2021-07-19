import { createRef, memo } from "react";

export default memo(function Embed() {
  const iframe = createRef<HTMLIFrameElement>();

  if (typeof window !== "undefined") {
    window.addEventListener(
      "message",
      e =>
        iframe.current &&
        e.data.height &&
        iframe.current.setAttribute("height", e.data.height)
    );
  }

  return (
    <iframe
      ref={iframe}
      src="/embed/60e32d227a9ab34cb0ba34ea"
      width="100%"
      loading="lazy"
      onLoad={(i: any) => i.target.contentWindow.postMessage("height", "*")}
    />
  );
});

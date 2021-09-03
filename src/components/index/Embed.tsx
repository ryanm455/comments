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
      title="Example Comments"
      src="/embed/60fc8db70032935100e7b868"
      width="100%"
      loading="lazy"
      onLoad={(i: any) => i.target.contentWindow.postMessage("height", "*")}
      className="my-20 md:my-36"
    />
  );
});

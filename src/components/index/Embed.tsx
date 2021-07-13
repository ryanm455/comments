import { createRef } from "react";

import { Container } from "@chakra-ui/react";

export default function Embed() {
  const iframe = createRef<HTMLIFrameElement>();

  if (typeof window !== "undefined") {
    window.addEventListener(
      "message",
      event =>
        iframe.current &&
        iframe.current.setAttribute("height", event.data.height)
    );
  }

  return (
    <Container>
      <iframe
        ref={iframe}
        src="/embed/60e32d227a9ab34cb0ba34ea"
        width="100%"
        loading="lazy"
        onLoad={(i: any) => i.target.contentWindow.postMessage("height", "*")}
      />
    </Container>
  );
}

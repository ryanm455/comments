"use client"
import React, {
  memo,
  useState,
} from "react";

import { Alert } from "components/ui/Alert";

const Notice = memo(() => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert
      type="info"
      className="rounded-none"
      onClose={() => setShow(false)}
      rounded={false}
    >
      Note this is not a legit company don&apos;t use this service it&apos;s
      just an experiment.
    </Alert>
  );
});

export default Notice;

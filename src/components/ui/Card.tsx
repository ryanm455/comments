import React from "react";

import classNames from "classnames";

export const Card = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={classNames(
      "min-w-0 rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-700",
      className
    )}
  >
    <div className="p-10">{children}</div>
  </div>
);

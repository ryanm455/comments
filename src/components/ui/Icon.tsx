"use client"
import classNames from "classnames";
import type { As } from "types/as";
import type { Overwrite } from "utility-types";

type Props = Overwrite<React.HTMLProps<HTMLImageElement>, { as: As }> & any;

const Icon = ({
  as: As,
  className,
  ...props
}: React.PropsWithChildren<Props>) => (
  <As
    className={classNames(
      "w-4 h-4 inline-block leading-4 flex-shrink-0 align-middle",
      className
    )}
    {...props}
  />
);

export default Icon;

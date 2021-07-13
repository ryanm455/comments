/* eslint-disable react/display-name */
import NextLink from "next/link";
import { forwardRef, ComponentPropsWithoutRef } from "react";

import type { UrlObject } from "url";
import type { Overwrite } from "utility-types";

type Props = Overwrite<
  ComponentPropsWithoutRef<"a">,
  { href: string | UrlObject }
>;

const LinkWrap = forwardRef<HTMLLinkElement, Props>(({ href, ...p }, ref) => (
  <NextLink href={href!} passHref>
    {/* @ts-ignore */}
    <a {...p} ref={ref} />
  </NextLink>
));

export default LinkWrap;

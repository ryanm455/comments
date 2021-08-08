import { ComponentPropsWithoutRef, forwardRef, LegacyRef } from "react";

import NextLink from "next/link";
import type { UrlObject } from "url";
import type { Overwrite } from "utility-types";

type Props = Overwrite<
  ComponentPropsWithoutRef<"a">,
  { href: string | UrlObject }
>;

const LinkWrap = forwardRef<HTMLLinkElement, Props>(({ href, ...p }, ref) => (
  <NextLink href={href!} passHref>
    <a {...p} ref={ref as LegacyRef<HTMLAnchorElement>} />
  </NextLink>
));

export default LinkWrap;

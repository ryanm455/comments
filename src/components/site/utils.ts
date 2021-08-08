import { ISettings } from "types/embed";

import type { Site } from "@prisma/client";

import type { ICheckList } from "./CheckList";

export const colors = [
  "rgb(156,163,175)",
  "rgb(107,114,128)",
  "rgb(75,85,99)",
  "rgb(248,113,113)",
  "rgb(239,68,68)",
  "rgb(220,38,38)",
  "rgb(251,191,36)",
  "rgb(245,158,11)",
  "rgb(217,119,6)",
  "rgb(52,211,153)",
  "rgb(16,185,129)",
  "rgb(5,150,105)",
  "rgb(96,165,250)",
  "rgb(59,130,246)",
  "rgb(37,99,235)",
  "rgb(129,140,248)",
  "rgb(99,102,241)",
  "rgb(79,70,229)",
  "rgb(167,139,250)",
  "rgb(139,92,246)",
  "rgb(124,58,237)",
  "rgb(244,114,182)",
  "rgb(236,72,153)",
  "rgb(219,39,119)",
];

export const siteFilter = ({
  errorColor,
  primaryColor,
  providers,
  name,
  authIcons,
  timestamps,
  ratings,
}: Site): Omit<ISettings, "id" | "authorId"> & { name: string } => ({
  errorColor,
  primaryColor,
  providers,
  name,
  authIcons,
  timestamps,
  ratings,
});

export const checkListItems: ICheckList[] = [
  {
    label: "Auth Provider Icons",
    c: "authIcons",
  },
  {
    label: "Timestamps",
    c: "timestamps",
  },
  {
    label: "Ratings",
    c: "ratings",
  },
];

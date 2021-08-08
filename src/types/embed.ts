import type { Site } from "@prisma/client";

export type ISettings = Omit<
  Site,
  "createdAt" | "updatedAt" | "pages" | "id" | "name"
>;

export type IAddComment = (
  text: string,
  commentId?: string | undefined
) => Promise<any>;

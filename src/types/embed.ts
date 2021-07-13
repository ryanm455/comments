import type { ISite } from "./db";

export type ISettings = Omit<
  ISite,
  "createdAt" | "updatedAt" | "pages" | "_id" | "name"
>;

export type IAddComment = (
  text: string,
  commentId?: string | undefined
) => Promise<void>;

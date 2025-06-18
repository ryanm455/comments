"use client";
import React, { createContext, useContext, useRef } from "react";

import CommentThread from "components/embed/CommentThread";
import { createStore, StoreApi, useStore } from "zustand";

import { Comment as IComment, Site, User } from "@prisma/client";

export const createdCommentStores: StoreApi<CommentStore>[] = [];

type Comment = IComment & {
  _count: {
    children: number;
  };
  author: User;
};

export type CommentStore = {
  comments: Record<string | "null", Comment>;
  commentReplies: Record<string | "null", Set<string>>;
  addComment: (comment: Comment, parentId?: string) => void;
  collapsed: Record<string, boolean>;
  toggleCollapse: (id: string) => void;
  getCommentReplies: (commentId?: string) => Comment[];
  setCommentReplies: (
    commentId: string | undefined,
    comment: Comment[]
  ) => void;
};

export const commentStore = (initial: Comment[] = []) => {
  const store = createStore<CommentStore>((set, get) => ({
    comments: Object.fromEntries(new Map(initial.map(c => [c.id, c]))),
    commentReplies: { null: new Set(initial.map(c => c.id)) },
    collapsed: {},
    toggleCollapse: id =>
      set(state => ({
        collapsed: { ...state.collapsed, [id]: !state.collapsed[id] },
      })),
    addComment: (comment, parentId = "null") =>
      set(state => ({
        comments: { ...state.comments, [comment.id]: comment },
        commentReplies: {
          ...state.commentReplies,
          [parentId]: new Set([
            ...(state.commentReplies[parentId] || []),
            comment.id,
          ]),
        },
      })),
    getCommentReplies: (commentId = "null") =>
      (get().commentReplies[commentId] || new Set())
        .values()
        .map(i => get().comments[i])
        .toArray(),
    setCommentReplies: (commentId = "null", comment: Comment[]) =>
      set(state => ({
        comments: {
          ...state.comments,
          ...Object.fromEntries(new Map(comment.map(c => [c.id, c]))),
        },
        commentReplies: {
          ...state.commentReplies,
          [commentId]: new Set([
            ...(state.commentReplies[commentId] || []),
            ...comment.map(c => c.id),
          ]),
        },
      })),
  }));

  createdCommentStores.push(store);

  return store;
};

// @ts-ignore
export const CommentContext = createContext<StoreApi<CommentStore>>({});

export const CommentThreadRoot = ({
  initialComments,
  settings,
  pageId,
}: {
  initialComments: Comment[];
  pageId: string;
  settings: Partial<Site>;
}) => {
  const store = useRef(commentStore(initialComments));

  return (
    <CommentContext.Provider value={store.current}>
      <CommentThread settings={settings} pageId={pageId} />
    </CommentContext.Provider>
  );
};

export function useCommentStore(): CommentStore;
export function useCommentStore<T>(selector: (state: CommentStore) => T): T;
export function useCommentStore<T>(selector?: (state: CommentStore) => T) {
  const store = useContext(CommentContext);
  if (!store)
    throw new Error("CommentThread must be created using CommentThreadRoot");
  return useStore(store, selector!);
}

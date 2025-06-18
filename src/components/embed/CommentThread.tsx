"use client"
import {
  memo,
  useCallback,
  useEffect,
} from "react";

import { Button } from "components/ui/Button";
import { useCommentStore } from "lib/commentStore";
import { useShallow } from "zustand/shallow";

import {
  Comment as IComment,
  Site,
  User,
} from "@prisma/client";

import { loadReplyAction } from "./actions";
import Comment from "./Comment";

type Props = {
  settings: Partial<Site>;
  pageId: string;
  parentId?: string;
  expectedNumComments?: number;
}

const CommentWrapper = ({ comment, settings, pageId }: {
  comment: (IComment & {
    _count: {
      children: number;
    };
    author: User;
  }), settings: Partial<Site>, pageId: string
}) => {
  const isCollapsed = useCommentStore(s => !!s.collapsed[comment.id]);
  const toggleCollapse = useCommentStore((s) => s.toggleCollapse);


  return (
    <div>
      <Comment settings={settings} comment={comment} />
      {comment._count.children > 0 ? (
        <Button layout="link" onClick={() => toggleCollapse(comment.id)}>
          {isCollapsed
            ? `Show ${comment._count.children} ${comment._count.children > 1 ? "replies" : "reply"}`
            : "Hide replies"
          }
        </Button>
      ) : null}

      {!isCollapsed && comment._count.children > 0 && (<div className="flex flex-row">
        <div
          className="self-stretch p-2 cursor-pointer"
          role="group"
          onClick={() => toggleCollapse(comment.id)}
        >
          <div className="w-1 h-full bg-gray-500 hover:bg-blue-500" />
        </div>
        <div className="flex flex-col w-full">
          <CommentThread
            settings={settings}
            pageId={pageId}
            parentId={comment.id}
            expectedNumComments={comment._count.children}
          />
        </div>
      </div>)}
    </div>
  )
}

const CommentThread = memo(({ parentId, settings, pageId, expectedNumComments: _expectedNumComments }: Props) => {
  const setCommentReplies = useCommentStore((s) => s.setCommentReplies);
  const comments = useCommentStore(useShallow(s => s.getCommentReplies(parentId)));

  const expectedNumComments = comments.length || _expectedNumComments || 0;

  const loadReplies = useCallback(async () => {
    const replies = await loadReplyAction(parentId!);
    setCommentReplies(parentId, replies);
  }, [setCommentReplies, parentId]);

  const repliesLength = comments.length;
  useEffect(() => {
    if (repliesLength === 0 && parentId && expectedNumComments > 0) {
      loadReplies();
    }
  }, [repliesLength, expectedNumComments, parentId, loadReplies]);

  if (comments.length > 0) {
    return comments.map(c => <CommentWrapper key={c.id} comment={c} pageId={pageId} settings={settings} />)
  }

  return expectedNumComments > 0 ? <p className="text-gray-900 dark:text-gray-200 mb-4">
    Replies loading...
  </p> : <p className="text-gray-900 dark:text-gray-200 mb-4">
    There are no comments for this page.
  </p>
});

export default CommentThread;

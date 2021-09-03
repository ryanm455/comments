import { FC, memo, useState } from "react";

import { Button } from "components/ui/Button";
import Link from "next/link";
import type { IAddComment, ISettings } from "types/embed";

import { Comment as IComment, Provider } from "@prisma/client";

import Comment from "./Comment";

type Comments = (IComment & {
  author: {
    name: string;
    provider: Provider;
  };
  children: Comments;
  votes: number;
  moreComments: boolean;
})[];

const CommentThread: FC<{
  comments: Comments;
  settings: ISettings;
  add?: IAddComment;
  pageId: string;
  vote: (type: string, commentId: string) => any;
}> = memo(({ comments, settings, add, vote, pageId }) => {
  const [showReplies, setShowReplies] = useState<boolean[]>(
    comments.map(() => true)
  );

  const toggleShowReplies = (idx: number) => {
    const _showReplies = showReplies.slice();
    _showReplies[idx] = !_showReplies[idx];

    setShowReplies(_showReplies);
  };

  return (
    <>
      {comments.map(
        ({ children = [], moreComments, ...comment }, idx: number) => (
          <div key={`${comment.id}-${idx}`}>
            <Comment settings={settings} add={add} vote={vote} {...comment} />
            {children.length > 0 ? (
              <Button layout="link" onClick={() => toggleShowReplies(idx)}>
                {showReplies[idx]
                  ? "Hide replies"
                  : `Show ${children.length} ${
                      children.length > 1 ? "replies" : "reply"
                    }`}
              </Button>
            ) : moreComments ? (
              <Link href={`/embed/${pageId}/${comment.id}`} passHref>
                <Button layout="link" tag="a">
                  Load more
                </Button>
              </Link>
            ) : null}

            {children && showReplies[idx] && (
              <div className="flex flex-row">
                {children.length > 0 && (
                  <div
                    className="self-stretch p-2 cursor-pointer"
                    role="group"
                    onClick={() => toggleShowReplies(idx)}
                  >
                    <div className="w-1 h-full bg-gray-500 hover:bg-blue-500" />
                  </div>
                )}
                <div className="flex flex-col">
                  <CommentThread
                    comments={children}
                    settings={settings}
                    add={add}
                    vote={vote}
                    pageId={pageId}
                  />
                </div>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
});

export default CommentThread;

import { FC, useState } from "react";
import { IComment } from "types/db";

import { Button } from "@windmill/react-ui";

import Comment from "./Comment";

import type { ISettings, IAddComment } from "types/embed";
import { memo } from "react";

const CommentThread: FC<{
  comments: IComment[];
  settings: ISettings;
  add: IAddComment;
}> = memo(({ comments, settings, add }) => {
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
      {comments.map(({ children = [], ...comment }: IComment, idx: number) => (
        <div key={`${comment._id}-${idx}`}>
          <Comment settings={settings} add={add} {...comment} />
          {children.length > 0 && (
            <Button layout="link" onClick={() => toggleShowReplies(idx)}>
              {showReplies[idx]
                ? "Hide replies"
                : `Show ${children.length} ${
                    children.length > 1 ? "replies" : "reply"
                  }`}
            </Button>
          )}

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
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
});

export default CommentThread;

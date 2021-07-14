import { FC, useState } from "react";
import { IComment } from "types/db";

import { Box, Button, Flex } from "@chakra-ui/react";

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
        <Box key={`${comment._id}-${idx}`}>
          <Comment settings={settings} add={add} {...comment} />
          {children.length > 0 && (
            <Button variant="link" onClick={() => toggleShowReplies(idx)}>
              {showReplies[idx]
                ? "Hide replies"
                : `Show ${children.length} ${
                    children.length > 1 ? "replies" : "reply"
                  }`}
            </Button>
          )}

          {children && showReplies[idx] && (
            <Flex flexDir="row">
              {children.length > 0 && (
                <Box
                  alignSelf="stretch"
                  p={2}
                  cursor="pointer"
                  role="group"
                  onClick={() => toggleShowReplies(idx)}
                >
                  <Box
                    w={1}
                    h="100%"
                    bg="gray.500"
                    _hover={{ bg: "blue.500" }}
                  />
                </Box>
              )}
              <Flex flexDir="column">
                <CommentThread
                  comments={children}
                  settings={settings}
                  add={add}
                />
              </Flex>
            </Flex>
          )}
        </Box>
      ))}
    </>
  );
});

export default CommentThread;

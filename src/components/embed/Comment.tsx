import Icon from "components/ProviderIcon";
import { useUser } from "lib/hooks";
import { useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp, FaCommentAlt, FaStar } from "react-icons/fa";
import { IComment } from "types/db";

import {
  Box,
  Button,
  Flex,
  Icon as CIcon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import ChakraMarkdown from "../ChakraMarkdown";
import AddComment from "./AddComment";

import type { ISettings, IAddComment } from "types/embed";

const Comment = ({
  _id,
  author,
  text,
  rating,
  createdAt,
  settings,
  add,
  downvotes,
  upvotes,
}: IComment & {
  settings: ISettings;
  add: IAddComment;
}) => {
  const [user, { mutate }] = useUser();
  const [reply, setReply] = useState(false);
  const [ratio, setRatio] = useState(upvotes - downvotes || 0);

  const vote = async (type: "up" | "down") => {
    const {
      comment: { downvotes: d, upvotes: u },
      user,
    } = await fetch(`/api/comment/${_id}/${type}vote`).then(r => r.json());
    mutate({ user }), setRatio(u - d || 0);
  };

  const voted = useMemo(() => {
    // @ts-ignore
    if (user && user?.upvoted.includes(_id)) return "up";
    // @ts-ignore
    if (user && user?.downvoted.includes(_id)) return "down";
  }, [user, _id]);

  return (
    <Box width="100%" p={2}>
      <Flex alignItems="center">
        <Text
          fontSize="md"
          fontWeight="medium"
          color={useColorModeValue("gray.900", "gray.200")}
        >
          {author.name}
        </Text>
        <Icon
          i={author.provider}
          ml="1.5"
          w={4}
          h={4}
          display="inline-block"
          flexShrink={0}
          size="13px"
        />
      </Flex>
      {settings?.timestamps && (
        <Text fontSize="xs" mb={4} color="gray.500">
          {new Date(createdAt).toUTCString()}
        </Text>
      )}
      {settings?.ratings && rating && (
        <p className="mb-2 text-xs">
          {Array(rating)
            .fill(0)
            .map((_, idx) => (
              <FaStar
                className="ml-1.5 w-4 h-4 inline-block leading-4 flex-shrink-0 text-yellow-400"
                size="13px"
                key={`f-${idx}`}
              />
            ))}
          {Array(5 - rating)
            .fill(0)
            .map((_, idx) => (
              <FaStar
                className="ml-1.5 w-4 h-4 inline-block leading-4 flex-shrink-0"
                size="13px"
                key={`u-${idx}`}
              />
            ))}
        </p>
      )}
      <Box color={useColorModeValue("gray.800", "gray.300")}>
        <ChakraMarkdown>{text}</ChakraMarkdown>
      </Box>
      <Flex alignItems="center" gridGap={1} mt={3}>
        <Text as="span" fontWeight="bold" mr={2}>
          {ratio}
        </Text>
        <IconButton
          variant="ghost"
          aria-label="Up Vote"
          className="upvote-btn"
          icon={
            <CIcon
              as={FaArrowUp}
              color={voted === "up" ? "red.600" : undefined}
              sx={{ ".upvote-btn:hover &": { color: "red.600" } }}
            />
          }
          onClick={() => user && vote("up")}
        />
        <IconButton
          variant="ghost"
          aria-label="Down Vote"
          className="downvote-btn"
          icon={
            <CIcon
              as={FaArrowDown}
              color={voted === "down" ? "blue.600" : undefined}
              sx={{ ".downvote-btn:hover &": { color: "blue.600" } }}
            />
          }
          onClick={() => user && vote("down")}
        />
        <Button
          leftIcon={<CIcon as={FaCommentAlt} />}
          variant="ghost"
          className="flex items-center text-gray-400 font-bold cursor-pointer p-2 rounded-sm hover:bg-gray-100"
          onClick={() => user && setReply(r => !r)}
        >
          Reply
        </Button>
      </Flex>
      {reply && <AddComment add={add} commentId={_id} />}
    </Box>
  );
};

export default Comment;

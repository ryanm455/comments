import {
  memo,
  useMemo,
  useState,
} from "react";

import classNames from "classnames";
import Icon from "components/Icon";
import ProviderIcon from "components/ProviderIcon";
import { Button } from "components/ui/Button";
import { useUser } from "lib/hooks";
import type { IAddComment } from "types/embed";

import {
  Comment as IComment,
  Provider,
} from "@prisma/client";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaCommentAlt } from "@react-icons/all-files/fa/FaCommentAlt";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

import ChakraMarkdown from "../ChakraMarkdown";
import AddComment from "./AddComment";

type Props = Omit<
  IComment & {
    author: {
      name: string;
      provider: Provider;
    };
    votes: number;
  },
  "children"
> & {
  settings: {
    timestamps: boolean;
    ratings: boolean;
  };
  add?: IAddComment;
  vote: (type: Voted, commentId: string) => any;
};

enum Voted {
  UP = "UPVOTE",
  DOWN = "DOWNVOTE",
}

const Comment: React.FC<Props> = memo(
  ({ id, text, rating, createdAt, settings, add, author, votes, vote }) => {
    const [user] = useUser();
    const [reply, setReply] = useState(false);

    const voted: Voted | undefined = useMemo(() => {
      // work around
      if (user && user.upvotedIds && user.upvotedIds.includes(id))
        return Voted.UP;
      if (user && user.downvotedIds && user.downvotedIds.includes(id))
        return Voted.DOWN;
    }, [user, id]);

    return (
      <div className="w-full p-2">
        <div className="flex items-center">
          <p className="text-md font-medium text-gray-900 dark:text-gray-200">
            {author.name}
          </p>
          <Icon as={ProviderIcon} i={author.provider} className="ml-1.5" />
        </div>
        {settings.timestamps && (
          <p className="text-xs mb-4 text-gray-500">
            {new Date(createdAt).toUTCString()}
          </p>
        )}
        {settings.ratings && rating && (
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
        <div className="text-gray-800 dark:text-gray-300">
          <ChakraMarkdown>{text}</ChakraMarkdown>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <span className="font-bold mr-2">{votes.toString()}</span>
          <Button
            layout="ghost"
            aria-label="Up Vote"
            className={classNames("hover:!text-red-600", {
              "!text-red-600": voted === Voted.UP,
            })}
            icon={() => <Icon as={FaArrowUp} />}
            onClick={() => user && vote(Voted.UP, id)}
          />

          <Button
            layout="ghost"
            aria-label="Down Vote"
            className={classNames("hover:!text-blue-600", {
              "!text-blue-600": voted === Voted.DOWN,
            })}
            icon={() => <Icon as={FaArrowDown} />}
            onClick={() => user && vote(Voted.DOWN, id)}
          />
          {add && (
            <Button
              iconLeft={() => <Icon as={FaCommentAlt} />}
              layout="ghost"
              onClick={() => user && setReply(r => !r)}
              className="gap-2"
            >
              Reply
            </Button>
          )}
        </div>
        {reply && add && (
          <AddComment add={add} commentId={id} className="mt-3" />
        )}
      </div>
    );
  }
);

export default Comment;

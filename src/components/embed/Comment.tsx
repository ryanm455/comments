"use client"
import {
  memo,
  useReducer,
  useState,
} from "react";

import classNames from "classnames";
import Rating from "components/Rating";
import { Button } from "components/ui/Button";
import Icon from "components/ui/Icon";
import ProviderIcon from "components/ui/ProviderIcon";
import { useSession } from "next-auth/react";

import {
  Comment as IComment,
  Site,
  User,
} from "@prisma/client";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaCommentAlt } from "@react-icons/all-files/fa/FaCommentAlt";

import ChakraMarkdown from "../ui/ChakraMarkdown";
import { voteAction } from "./actions";
import CommentBox from "./CommentBox";

export enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

type Props = {
  comment: IComment & { author: User };
  settings: Partial<Site>;
};

const Comment = memo(
  ({ settings, comment }: Props) => {
    const [votes, setVotes] = useState<number>(comment.votes);
    const [reply, toggleReply] = useReducer(r => !r, false);
    const { status } = useSession();
    const isAuthenticated = status === "authenticated";

    const vote = async (type: VoteType) => {
      const voteChange = await voteAction(comment.id, type);
      setVotes(v => v + voteChange)
    }
    const upVote = () => vote(VoteType.UPVOTE);
    const downVote = () => vote(VoteType.DOWNVOTE);

    const voted = null;

    return (
      <div className="w-full p-2">
        <div className="flex items-center">
          <p className="text-md font-medium text-gray-900 dark:text-gray-200">
            {comment.author.name}
          </p>
          <Icon as={ProviderIcon} i={(comment.author as any).provider} className="ml-1.5" />
        </div>
        {settings.timestamps && (
          <p className="text-xs mb-4 text-gray-500">
            {new Date(comment.createdAt).toUTCString()}
          </p>
        )}
        {settings.ratings && comment.rating && <Rating rating={comment.rating} className="mt-[calc(var(--spacing)*-3)] mb-4" />}
        <div className="text-gray-800 dark:text-gray-300">
          <ChakraMarkdown>{comment.text}</ChakraMarkdown>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <span className="font-bold mr-2">{votes.toString()}</span>
          <Button
            layout="ghost"
            aria-label="Up Vote"
            className={classNames("hover:!text-red-600", {
              "!text-red-600": voted === VoteType.UPVOTE,
            })}
            icon={() => <Icon as={FaArrowUp} />}
            onClick={() => isAuthenticated && upVote()}
          />

          <Button
            layout="ghost"
            aria-label="Down Vote"
            className={classNames("hover:!text-blue-600", {
              "!text-blue-600": voted === VoteType.DOWNVOTE,
            })}
            icon={() => <Icon as={FaArrowDown} />}
            onClick={() => isAuthenticated && downVote()}
          />
          <Button
            iconLeft={() => <Icon as={FaCommentAlt} />}
            layout="ghost"
            onClick={toggleReply}
            className="gap-2"
          >
            Reply
          </Button>
        </div>
        {reply && (
          <CommentBox parentCommentId={comment.id} className="mt-3" pageId={comment.pageId || undefined} settings={settings} />
        )}
      </div>
    );
  }
);

export default Comment;

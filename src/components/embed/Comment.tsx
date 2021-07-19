import classNames from "classnames";
import Icon from "components/Icon";
import ProviderIcon from "components/ProviderIcon";
import { useUser } from "lib/hooks";
import { memo, useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp, FaCommentAlt, FaStar } from "react-icons/fa";
import { IComment } from "types/db";

import { Button } from "@windmill/react-ui";

import ChakraMarkdown from "../ChakraMarkdown";
import AddComment from "./AddComment";

import type { ISettings, IAddComment } from "types/embed";

const Comment = memo(
  ({
    _id,
    author,
    text,
    rating,
    createdAt,
    settings,
    add,
    downvotes,
    upvotes,
  }: Omit<IComment, "children"> & {
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
      // work around
      if (user && user?.upvoted.includes(_id as unknown as IComment))
        return "up";
      if (user && user?.downvoted.includes(_id as unknown as IComment))
        return "down";
    }, [user, _id]);

    return (
      <div className="w-full p-2">
        <div className="flex items-center">
          <p className="text-md font-medium text-gray-900 dark:text-gray-200">
            {author.name}
          </p>
          <Icon
            as={ProviderIcon}
            i={author.provider}
            className="ml-1.5"
            // size="13px"
          />
        </div>
        {settings?.timestamps && (
          <p className="text-xs mb-4 text-gray-500">
            {new Date(createdAt).toUTCString()}
          </p>
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
        <div className="text-gray-800 dark:text-gray-300">
          <ChakraMarkdown>{text}</ChakraMarkdown>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <span className="font-bold mr-2">{ratio}</span>
          <Button
            layout="link"
            aria-label="Up Vote"
            className={classNames("hover:!text-red-600", {
              "!text-red-600": voted === "up",
            })}
            icon={() => <Icon as={FaArrowUp} />}
            onClick={() => user && vote("up")}
          />

          <Button
            layout="link"
            aria-label="Down Vote"
            className={classNames("hover:!text-blue-600", {
              "!text-blue-600": voted === "down",
            })}
            icon={() => <Icon as={FaArrowDown} />}
            onClick={() => user && vote("down")}
          />
          <Button
            iconLeft={() => <Icon as={FaCommentAlt} />}
            layout="link"
            onClick={() => user && setReply(r => !r)}
            className="gap-2"
          >
            Reply
          </Button>
        </div>
        {reply && <AddComment add={add} commentId={_id} />}
      </div>
    );
  }
);

export default Comment;

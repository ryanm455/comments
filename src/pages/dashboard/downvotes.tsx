import { useCallback, useState } from "react";

import { DashLayout } from "components/dashboard/DashLayout";
import Comment from "components/embed/Comment";
import { DOWNVOTED_COMMENT_QUERY, VOTE_COMMENT_QUERY } from "lib/gqlRequests";
import { useUser } from "lib/hooks";
import middleware from "middleware";
import { GetServerSideProps } from "next";
import { gqlServer, parse, redirect } from "server-utils";
import { gqlQuery } from "utils";

import type { Comment as IComment, Provider, User } from "@prisma/client";

type Props = {
  comments: (IComment & {
    author: {
      name: string;
      provider: Provider;
    };
    votes: number;
  })[];
  user: User;
};

const settings = { timestamps: true, ratings: false };

const Comments: React.FC<Props> = ({ comments: c }) => {
  const [comments, setComments] = useState(c);
  const [_, { mutate }] = useUser();

  const vote = useCallback(
    async (type: string, id: string) => {
      const { votes, author } = (await gqlQuery(VOTE_COMMENT_QUERY, {
        type,
        commentId: id,
      })) as any;
      mutate(author);
      setComments(c => c.map(e => (e.id === id ? { ...e, votes } : e)));
    },
    [mutate]
  );

  return (
    <>
      <h1 className="text-3xl mb-4 font-semibold">Downvoted Comments</h1>
      {comments.length ? (
        comments.map(c => (
          <Comment {...c} key={c.id} settings={settings} vote={vote} />
        ))
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          You have not downvoted any comments.
        </p>
      )}
    </>
  );
};

Comments.getLayout = (page: typeof Comments, { user }: Props) => (
  <DashLayout user={user}>{page}</DashLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  const comments = await gqlServer(
    DOWNVOTED_COMMENT_QUERY,
    {},
    { req, res }
  ).then((r: any) => r.data.me.downvoted);

  return {
    props: {
      comments: parse(comments),
      user: parse(req.user),
    },
  };
};

export default Comments;

import { useCallback, useEffect, useMemo } from "react";

import CommentThread from "components/embed/CommentThread";
import EmbedLayout from "components/embed/EmbedLayout";
import { Button } from "components/ui/Button";
import {
  CREATE_COMMENT_QUERY,
  SINGLE_COMMENT_QUERY,
  VOTE_COMMENT_QUERY,
} from "lib/gqlRequests";
import { useUser } from "lib/hooks";
import prisma from "lib/prisma";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { gqlServer, notFound, parse } from "server-utils";
import useSWR from "swr";
import { embedListener, gqlQuery } from "utils";

import type { Provider } from "@prisma/client";

type Comment = {
  id: string;
  text: string;
  authorId: string;
  author: {
    name: string;
    provider: Provider;
  };
  children: Comment[];
  votes: number;
  createdAt: Date;
};

type Props = {
  comment: Comment;
  site: {
    primaryColor: string;
    errorColor: string;
    authIcons: boolean;
    timestamps: boolean;
    ratings: boolean;
  };
  pageId: string;
};

const Embed: React.FC<Props> = ({ comment: initialData, pageId, site }) => {
  const [_, { mutate: updateUser }] = useUser();
  const variables = useMemo(() => ({ id: initialData.id }), [initialData.id]); // without causes infinite loop lol
  const { data: comment, mutate } = useSWR<Comment>( // @ts-ignore
    [SINGLE_COMMENT_QUERY, variables],
    {
      initialData,
    }
  );

  const addComment = useCallback(
    async (text: string, commentId?: string) =>
      mutate(async c => {
        const comment = (await gqlQuery(CREATE_COMMENT_QUERY, {
          text,
          pageId: commentId ? null : pageId,
          parentCommentId: commentId,
        })) as Comment;

        return { ...c!, children: [...c!.children, comment] };
      }),
    [mutate, pageId]
  );

  const vote = useCallback(
    async (type: string, id: string) => {
      const { votes, author } = (await gqlQuery(VOTE_COMMENT_QUERY, {
        type,
        commentId: id,
      })) as any;
      updateUser(author);
      mutate(p => ({
        ...p!,
        comments: p!.children.map(e => (e.id === id ? { ...e, votes } : e)),
      }));
    },
    [mutate, updateUser]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("message", embedListener);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("message", embedListener);
      }
    };
  }, []);

  return (
    <div className="w-full p-1">
      <Link href={`/embed/${pageId}`} passHref>
        <Button layout="link" tag="a">
          ← return
        </Button>
      </Link>
      {comment ? (
        <CommentThread
          comments={[comment] as any[]}
          settings={site as any}
          add={addComment}
          vote={vote}
          pageId={pageId}
        />
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          There are no replies to this comment.
        </p>
      )}
    </div>
  );
};

Embed.getLayout = (
  page: typeof Embed,
  { site: { primaryColor, errorColor } }: Props
) => (
  <EmbedLayout primaryColor={primaryColor} errorColor={errorColor}>
    {page}
  </EmbedLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  if (!params || !params.comment || !params.page) return notFound;

  const {
    data: { comment },
  }: any = await gqlServer(SINGLE_COMMENT_QUERY, {
    id: params.comment.toString(),
  });

  const page = await prisma.page.findUnique({
    where: { id: params.page.toString() },
    include: { site: true },
  });

  if (!page) return notFound;

  return {
    props: {
      comment: parse(comment),
      pageId: page.id,
      site: page.site,
    },
  };
};

export default Embed;

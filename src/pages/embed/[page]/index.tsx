import { useCallback, useEffect, useMemo } from "react";

import AddComment from "components/embed/AddComment";
import CommentThread from "components/embed/CommentThread";
import EmbedLayout from "components/embed/EmbedLayout";
import Login from "components/embed/Login";
import Icon from "components/Icon";
import {
  COMMENT_QUERY,
  CREATE_COMMENT_QUERY,
  VOTE_COMMENT_QUERY,
} from "lib/gqlRequests";
import { useUser } from "lib/hooks";
import prisma from "lib/prisma";
import { APP_URL } from "meta";
import type { GetStaticPaths, GetStaticProps } from "next";
import { FaExternalLinkAlt } from "react-icons/fa";
import { gqlServer, notFound, parse } from "server-utils";
import useSWR from "swr";
import { embedListener, gqlQuery } from "utils";

import type { Provider, Site } from "@prisma/client";

type Comment = {
  id: string;
  text: string;
  authorId: string;
  author: {
    name: string;
    provider: Provider;
  };
  votes: number;
  createdAt: Date;
};

type Query = {
  comments: Comment[];
  site: Site;
};

type Props = {
  page: Query;
  pageId: string;
};

const Embed: React.FC<Props> = ({ page: initialData, pageId }) => {
  const [user, { mutate: updateUser }] = useUser();
  const variables = useMemo(() => ({ id: pageId }), [pageId]); // without causes infinite loop lol
  const { data: page, mutate } = useSWR<Query>([COMMENT_QUERY, variables], {
    initialData,
  });

  const addComment = useCallback(
    async (text: string, commentId?: string) =>
      mutate(async page => {
        const comment = (await gqlQuery(CREATE_COMMENT_QUERY, {
          text,
          pageId: commentId ? null : pageId,
          parentCommentId: commentId,
        })) as Comment;

        return { ...page!, comments: [...page!.comments, comment] };
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
        comments: p!.comments.map(e => (e.id === id ? { ...e, votes } : e)),
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
      <div className="mb-6">
        {user ? (
          <AddComment add={addComment} />
        ) : (
          <Login authMethod={page?.site.providers || []} mutate={updateUser} />
        )}
      </div>
      {page && page.comments.length ? (
        <CommentThread
          comments={page.comments as any}
          settings={page!.site}
          add={addComment}
          vote={vote}
          pageId={pageId}
        />
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          There are no comments for this page.
        </p>
      )}
      <a
        href={APP_URL}
        className="my-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Add comments to your site{" "}
        <Icon as={FaExternalLinkAlt} className="ml-[2px]" />
      </a>
    </div>
  );
};

Embed.getLayout = (
  page: typeof Embed,
  {
    page: {
      site: { primaryColor, errorColor },
    },
  }: Props
) => (
  <EmbedLayout primaryColor={primaryColor} errorColor={errorColor}>
    {page}
  </EmbedLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await prisma.page.findMany();

  const paths = pages.map(page => ({
    params: { page: page.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || !params.page) return notFound;

  const {
    data: { page },
  }: any = await gqlServer(COMMENT_QUERY, { id: params.page.toString() }); // done live this to access voted field otherwise a LOT of code would be needed to replicate

  return {
    props: {
      pageId: params.page.toString(),
      page: parse(page),
    },
    revalidate: 60 * 3, // 3 mins
  };
};

export default Embed;

/* eslint-disable react-hooks/rules-of-hooks */
import AddComment from "components/embed/AddComment";
import CommentThread from "components/embed/CommentThread";
import Login from "components/embed/Login";
import dbConnect from "lib/dbConnect";
import { useUser } from "lib/hooks";
import { APP_URL } from "meta";
import { PageModel, SiteModel } from "models";
import mongoose from "mongoose";
import { useCallback } from "react";
import useSWR from "swr";
import { Layout } from "types/layout";
import { notFound, parse } from "utils";

import {
  Box,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { IComment } from "types/db";
import type { ISettings } from "types/embed";
import { FaExternalLinkAlt } from "react-icons/fa";

export const fetcher = (url: string) =>
  fetch(url)
    .then(r => r.json())
    .then(r => r.comments);

if (typeof window !== "undefined") {
  window.addEventListener("message", (e: any) => {
    if (e.data == "height") {
      const [body, html] = [document.body, document.documentElement];

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      e.source.postMessage({ height }, "*");

      new ResizeObserver(entries =>
        e.source.postMessage({ height: entries[0].target.clientHeight }, "*")
      ).observe(document.body);
    }
  });
}

const Embed: React.FC<{
  comments: IComment[];
  pageId: string;
  settings: ISettings;
}> = ({ comments: initialData, pageId, settings }) => {
  const [user, { mutate: updateUser }] = useUser();
  const { data, mutate } = useSWR<IComment[]>(
    `/api/comment/${pageId}`,
    fetcher,
    { initialData }
  );

  const addComment = useCallback(
    async (text: string, commentId?: string) => {
      const comment: IComment = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          pageId: commentId ? null : pageId,
          commentId,
        }),
      })
        .then(r => r.json())
        .then(r => r.comment);

      mutate([...data!, comment]);
    },
    [data, mutate, pageId]
  );

  return (
    <Flex flexDir="column" w="100%" p={1}>
      <Box mb={6}>
        {user ? (
          <AddComment add={addComment} />
        ) : (
          <Login authMethod={settings.providers || []} mutate={updateUser} />
        )}
      </Box>
      {data && data.length ? (
        <CommentThread comments={data} settings={settings} add={addComment} />
      ) : (
        <Text color={useColorModeValue("gray.900", "gray.200")}>
          There are no comments for this page.
        </Text>
      )}
      <Link href={APP_URL} isExternal my={2}>
        Add Comments to your site <Icon as={FaExternalLinkAlt} mx="2px" />
      </Link>
    </Flex>
  );
};

Embed.layout = Layout.Embed;

export const getStaticPaths: GetStaticPaths = async () => {
  if (mongoose.connection.readyState === 0) await dbConnect();

  const pages = await PageModel.find().lean();

  const paths = pages.map(page => ({
    params: { page: page._id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (mongoose.connection.readyState === 0) await dbConnect();

  if (!params || !params.page) return notFound;

  const page: any | null = await PageModel.findById(params.page)
    .populate("comments")
    .lean();

  if (!page) return notFound;

  // @ts-ignore
  const settings = await SiteModel.findOne({ pages: { _id: page._id } }).select(
    ["-createdAt", "-updatedAt", "-pages", "-_id", "-name"]
  );

  return {
    props: {
      pageId: params.page,
      comments: parse(page.comments || []),
      settings: parse(settings),
    },
    revalidate: 60 * 3, // 3 mins
  };
};

export default Embed;

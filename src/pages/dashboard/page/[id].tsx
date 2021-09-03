import { FC, useCallback, useMemo } from "react";

import { DashLayout } from "components/dashboard/DashLayout";
import CommentThread from "components/embed/CommentThread";
import { Field } from "components/Field";
import { Button } from "components/ui/Button";
import { HookedForm } from "hooked-form";
import { PAGE_QUERY, VOTE_COMMENT_QUERY } from "lib/gqlRequests";
import { useUser } from "lib/hooks";
import { APP_URL } from "meta";
import middleware from "middleware";
import type { GetServerSideProps } from "next";
import { gqlServer, notFound, parse, redirect } from "server-utils";
import useSWR from "swr";
import { gqlQuery } from "utils";

import type { Comment, Page as IPage, Site, User } from "@prisma/client";

type P = IPage & {
  comments: Comment[];
  site: Site;
};

type Props = {
  page: P;
  user: User & {
    downvoted: {
      id: string;
    }[];
    upvoted: {
      id: string;
    }[];
  };
  pageId: string;
};

const Page: FC<Props> = ({ page: initialData, pageId }) => {
  const variables = useMemo(() => ({ id: pageId }), [pageId]);
  // @ts-ignore
  const { data: p, mutate: mutatePage } = useSWR<P>([PAGE_QUERY, variables], {
    initialData,
  });

  const page: P = p || initialData;

  const [_, { mutate: mutateUser }] = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = useMemo(() => ({ name: page.name }), [page.name]);

  const savePage = (v: object) =>
    fetch(`/api/page/${pageId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v),
    });

  const vote = useCallback(
    async (type: string, id: string) => {
      const { votes, author } = (await gqlQuery(VOTE_COMMENT_QUERY, {
        type,
        commentId: id,
      })) as any;
      mutateUser(author);
      // @ts-ignore
      mutatePage((p: P) => ({
        ...p!,
        comments: p!.comments.map((e: Comment) =>
          e.id === id ? { ...e, votes } : e
        ),
      }));
    },
    [mutateUser, mutatePage]
  );

  return (
    <>
      <HookedForm
        onSubmit={savePage}
        initialValues={initialValues}
        validateOnBlur
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <h1 className="font-semibold text-3xl mb-4">Customize</h1>
            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
            />
            <Button
              disabled={isSubmitting || false}
              className="mt-4"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </>
        )}
      </HookedForm>
      <h1 className="font-semibold text-3xl my-4">How To Add To Site</h1>
      <h2 className="font-semibold text-2xl my-4">React</h2>
      <code className="whitespace-pre">{`import { createRef } from "react";

export default function Embed() {
  const iframe = createRef();

  window.addEventListener(
    "message",
    e =>
      iframe.current &&
      e.data.height &&
      iframe.current.setAttribute("height", e.data.height)
  );

  return (
    <iframe
      ref={iframe}
      src="${APP_URL}/embed/${pageId}"
      width="100%"
      loading="lazy"
      onLoad={i => i.target.contentWindow.postMessage("height", "*")}
    />
  );
}`}</code>
      <h2 className="font-semibold text-2xl my-4">Javascript / HTML</h2>
      <code className="whitespace-pre">
        {`<iframe
  src="${APP_URL}/embed/${pageId}"
  width="100%"
  loading="lazy"
></iframe>

const iframe = document.querySelector("iframe");
iframe.onload = i => i.target.contentWindow.postMessage("height", "*");

window.addEventListener(
  "message",
  e => iframe.setAttribute("height", e.data.height)
);`}
      </code>
      <h1 className="font-semibold text-3xl my-4">Comments</h1>
      {page.comments && page.comments.length ? (
        <CommentThread
          comments={(page.comments || []) as any}
          settings={page.site}
          vote={vote}
          pageId={pageId}
        />
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          There are no comments for this page.
        </p>
      )}
    </>
  );
};

Page.getLayout = (page: typeof Page, { user }: Props) => (
  <DashLayout user={user}>{page}</DashLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  const page = await gqlServer(PAGE_QUERY, { id: query.id?.toString() });

  if (!page) return notFound;

  return {
    props: {
      pageId: query.id!.toString(),
      page: parse(page.data!.page),
      user: parse(req.user),
    },
  };
};

export default Page;

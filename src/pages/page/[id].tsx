/* eslint-disable react-hooks/rules-of-hooks */
import { Field } from "components/Field";
import CommentsWrap from "components/page/CommentsWrap";
import { HookedForm } from "hooked-form";
import { useUser } from "lib/hooks";
import { APP_URL } from "meta";
import middleware from "middleware";
import { PageModel, SiteModel } from "models";
import { isValidObjectId } from "mongoose";
import Router from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { notFound, parse, redirect } from "utils";

import { Button } from "@windmill/react-ui";

import type { GetServerSideProps } from "next";
import type { IPage } from "types/db";
import type { ISettings } from "types/embed";
// @ts-ignore
const defaultPage: IPage = {
  name: "",
};

const Page: FC<{
  refSite?: string;
  page: IPage;
  settings: ISettings;
}> = ({ refSite, page: s, settings }) => {
  const [page, setPage] = useState(!refSite ? s : defaultPage);

  const [user] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (!user) Router.push("/");
  }, [user]);

  const initialValues = useMemo(() => ({ name: page.name }), [page.name]);

  const onSubmit = async (values: { name?: string }) => {
    let req = null;
    if (refSite) {
      req = fetch("/api/page", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, ref: refSite }),
      });
    } else {
      req = fetch(`/api/page/${page._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    }

    setPage(await req.then(e => e.json()).then(e => e.page));
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <HookedForm
        onSubmit={onSubmit}
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
      {page._id && (
        <>
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
      src="/embed/${page._id}"
      width="100%"
      loading="lazy"
      onLoad={i => i.target.contentWindow.postMessage("height", "*")}
    />
  );
}`}</code>
          <h2 className="font-semibold text-2xl my-4">Javascript / HTML</h2>
          <code className="whitespace-pre">
            {`<iframe
  src="${APP_URL}/embed/60e32d227a9ab34cb0ba34ea"
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
        </>
      )}
      <h1 className="font-semibold text-3xl my-4">Comments</h1>
      {page.comments && page.comments.length ? (
        <CommentsWrap
          settings={settings}
          pageId={page._id}
          comments={page.comments}
        />
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          There are no comments for this page.
        </p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  if (query.id === "new") {
    if (!query.ref || !isValidObjectId(query.ref)) return notFound;

    return {
      props: {
        refSite: query.ref,
      },
    };
  }

  const page = await PageModel.findById(query.id).populate("comments").lean();

  if (!page) return notFound;

  // @ts-ignore
  const settings = await SiteModel.findOne({ pages: { _id: page._id } })
    .select(["-createdAt", "-updatedAt", "-pages", "-_id", "-name"])
    .lean();

  return {
    props: {
      page: parse(page),
      settings: parse(settings),
      refSite: query.ref || null,
    },
  };
};

export default Page;

/* eslint-disable react-hooks/rules-of-hooks */
import { Field } from "components/Field";
import CommentsWrap from "components/page/CommentsWrap";
import { HookedForm } from "hooked-form";
import { useUser } from "lib/hooks";
import { APP_URL } from "meta";
import db from "middleware/db";
import { PageModel, SiteModel } from "models";
import { isValidObjectId } from "mongoose";
import nc from "next-connect";
import Router from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { notFound, parse, redirect } from "utils";

import {
  Button,
  Code,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import type { GetServerSidePropsContext } from "next";
import type { ApiRequest } from "types/custom-req";
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
    if (user) Router.push("/");
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
    <Container maxW="5xl">
      <HookedForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validateOnBlur
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <Heading mb={4}>Customize</Heading>
            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
            />
            <Button
              isLoading={isSubmitting || false}
              mt={4}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </>
        )}
      </HookedForm>
      {page._id && (
        <>
          <Heading my={4}>How To Add To Site</Heading>
          <Tabs>
            <TabList>
              <Tab>React</Tab>
              <Tab>Javascript</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Code whiteSpace="pre">{`import { createRef } from "react";

export default function Embed() {
  const iframe = createRef();

  window.addEventListener(
    "message",
    event =>
      iframe.current &&
      iframe.current.setAttribute("height", event.data.height)
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
}`}</Code>
              </TabPanel>
              <TabPanel>
                <Code whiteSpace="pre" mb={2}>
                  {`<iframe
  src="${APP_URL}/embed/60e32d227a9ab34cb0ba34ea"
  width="100%"
  loading="lazy"
></iframe>`}
                </Code>
                <Code whiteSpace="pre">
                  {`const iframe = document.querySelector("iframe");
iframe.onload = i => i.target.contentWindow.postMessage("height", "*");

window.addEventListener(
  "message",
  event => iframe.setAttribute("height", event.data.height)
);`}
                </Code>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
      <Heading my={4}>Comments</Heading>
      {page.comments && page.comments.length ? (
        <CommentsWrap
          settings={settings}
          pageId={page._id}
          comments={page.comments}
        />
      ) : (
        <Text color={useColorModeValue("gray.900", "gray.200")}>
          There are no comments for this page.
        </Text>
      )}
    </Container>
  );
};

export const getServerSideProps = async ({
  req,
  res,
  query,
}: GetServerSidePropsContext & { req: ApiRequest }) => {
  const handler = nc().use(db);

  try {
    await handler.run(req, res);
  } catch (e) {}

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

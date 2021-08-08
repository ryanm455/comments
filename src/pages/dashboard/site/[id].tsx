import { FC, useCallback, useMemo, useState } from "react";

import Boxes from "components/Box";
import { DashLayout } from "components/dashboard/DashLayout";
import { Field } from "components/Field";
import InitModelWithName from "components/InitModelWithName";
import CheckList from "components/site/CheckList";
import OptionSelect from "components/site/OptionSelect";
import ThemeSelect from "components/site/ThemeSelect";
import { checkListItems, siteFilter } from "components/site/utils";
import { HookedForm } from "hooked-form";
import prisma from "lib/prisma";
import middleware from "middleware";
import type { GetServerSideProps } from "next";
import Router from "next/router";
import { notFound, parse, redirect } from "server-utils";

import type { Page, Site as ISite, User } from "@prisma/client";
import { Button } from "@windmill/react-ui";

type Props = {
  site: ISite & {
    pages: Page[];
  };
  user: User & {
    downvoted: {
      id: string;
    }[];
    upvoted: {
      id: string;
    }[];
  };
};

const Site: FC<Props> = ({ site }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const defaultValues = useMemo(() => siteFilter(site), [site]);

  const saveSite = (v: object) =>
    fetch(`/api/site/${site.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v),
    });

  const createPage = useCallback(
    (v: object) =>
      fetch("/api/page", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...v, ref: site.id }),
      })
        .then(r => r.json())
        .then(r => Router.push(`/dashboard/page/${r.page.id}`)),
    [site.id]
  );

  return (
    <>
      <Boxes
        data={site.pages || []}
        name="page"
        header="Pages"
        add={openModal}
      />
      <HookedForm
        initialValues={defaultValues}
        onSubmit={saveSite}
        validateOnBlur
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <h1 className="font-semibold text-3xl my-4">Settings</h1>

            <CheckList list={checkListItems} />

            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
              className="mt-3"
            />

            <OptionSelect />

            <h1 className="font-semibold text-3xl mt-4">Theme</h1>
            {[
              ["Primary Color", "primaryColor"],
              ["Error Color", "errorColor"],
            ].map(([name, edit]: any) => (
              <ThemeSelect key={edit} name={name} edit={edit} />
            ))}
            <Button
              disabled={isSubmitting || false}
              className="my-7"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </>
        )}
      </HookedForm>
      <InitModelWithName
        header="Add Page"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={createPage}
      />
    </>
  );
};

Site.getLayout = (page: typeof Site, { user }: Props) => (
  <DashLayout user={user}>{page}</DashLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  await middleware.run(req as any, res as any);

  if (!req.user) return redirect("/login");

  const site = await prisma.site.findUnique({
    where: { id: query.id!.toString() },
    include: { pages: true },
  });

  if (!site) return notFound;

  return {
    props: {
      site: parse(site),
      user: parse(req.user),
    },
  };
};

export default Site;

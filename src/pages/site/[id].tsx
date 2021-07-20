import Boxes from "components/Box";
import { Field } from "components/Field";
import CheckList from "components/site/CheckList";
import OptionSelect from "components/site/OptionSelect";
import ThemeSelect from "components/site/ThemeSelect";
import { checkListItems, defaultSite, siteFilter } from "components/site/utils";
import { HookedForm } from "hooked-form";
import { useUser } from "lib/hooks";
import middleware from "middleware";
import { SiteModel } from "models";
import Router from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { notFound, parse, redirect } from "utils";

import { Button } from "@windmill/react-ui";

import type { Provider, ISite, IUser } from "types/db";
import type { GetServerSideProps } from "next";

const Site: FC<{ newSite: boolean; site: ISite; user: IUser }> = ({
  newSite,
  site: s,
  user: u,
}) => {
  const [user] = useUser(u);

  useEffect(() => {
    // redirect to home if user is authenticated
    if (!user) Router.push("/");
  }, [user]);

  const [meta, setMeta] = useState<{
    pages: ISite["pages"];
    _id?: string;
    primaryColor: string;
  }>({
    pages: !newSite ? s.pages : [],
    _id: !newSite ? s._id : undefined,
    primaryColor: !newSite ? s.primaryColor : "",
  });

  const defaultValues = useMemo(
    () => siteFilter(!newSite ? s : defaultSite),
    [newSite, s]
  );

  const onSubmit = async (
    values: Partial<{
      errorColor: string;
      primaryColor: string;
      providers: Provider[];
      name: string;
      authIcons: boolean;
      timestamps: boolean;
      ratings: boolean;
    }>
  ) => {
    if (newSite) {
      const { _id, pages, primaryColor } = await fetch("/api/site", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(r => r.json())
        .then(r => r.site);

      setMeta({ _id, pages, primaryColor });
    } else {
      await fetch(`/api/site/${meta._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {meta._id && (
        <Boxes
          data={meta.pages || []}
          name="page"
          header="Pages"
          refId={meta._id}
          boxColor={meta.primaryColor}
        />
      )}
      <HookedForm
        initialValues={defaultValues}
        onSubmit={onSubmit}
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

  let [newSite, site]: [boolean, any] = [query.id === "new", null];

  if (!newSite) {
    site = await SiteModel.findById(query.id)
      .populate({ path: "pages" })
      .lean();

    if (!site) return notFound;
  }

  return {
    props: {
      site: parse(site),
      newSite,
      user: parse(req.user),
    },
  };
};

export default Site;

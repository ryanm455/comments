import { Field } from "components/Field";
import Boxes from "components/Box";
import CheckList from "components/site/CheckList";
import OptionSelect from "components/site/OptionSelect";
import ThemeSelect from "components/site/ThemeSelect";
import { checkListItems, defaultSite, siteFilter } from "components/site/utils";
import { HookedForm } from "hooked-form";
import db from "middleware/db";
import { SiteModel } from "models";
import nc from "next-connect";
import { useMemo, useState, FC } from "react";

import { Button, Container, Heading } from "@chakra-ui/react";

import type { Provider, ISite } from "types/db";
import type { ApiRequest } from "types/custom-req";
import type { GetServerSidePropsContext } from "next";
import { notFound, redirect, parse } from "utils";

const Site: FC<{ newSite: boolean; site: ISite }> = ({ newSite, site: s }) => {
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
    <Container maxW="5xl">
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
            <Heading my={4}>Settings</Heading>

            <CheckList list={checkListItems} />

            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
            />

            <OptionSelect />

            <Heading mt={4}>Theme</Heading>
            {[
              ["Primary Color", "primaryColor"],
              ["Error Color", "errorColor"],
            ].map(([name, edit]: any) => (
              <ThemeSelect key={edit} name={name} edit={edit} />
            ))}
            <Button
              isLoading={isSubmitting || false}
              my={7}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </>
        )}
      </HookedForm>
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

  let [newSite, site]: [boolean, any] = [query.id === "new", null];

  if (!newSite) {
    site = await SiteModel.findById(query.id).populate({ path: "pages" }).lean();

    if (!site) return notFound;
  }

  return {
    props: {
      site: parse(site),
      newSite,
    },
  };
};

export default Site;

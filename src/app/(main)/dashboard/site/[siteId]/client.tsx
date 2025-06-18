"use client";

import { useReducer } from "react";

import { siteFilter } from "components/site/utils";
import { Grid } from "components/ui/Grid";
import dynamic from "next/dynamic";

import { UpdateSiteForm } from "./form";

const NameModal = dynamic(() => import("components/ui/NameModal").then(m => m.NameModal));

type Props = {
  site: {
    pages: { id: string; name: string }[];
  };
  defaultValues: ReturnType<typeof siteFilter>
  saveSite: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>
  createPage: (prevState: string | undefined, formData: FormData) => Promise<string>
};

const ClientSite = ({ site, defaultValues, saveSite, createPage }: Props) => {
  const [isModalOpen, toggleModal] = useReducer((r) => !r, false);

  return (
    <>
      <Grid
        data={site.pages || []}
        resourceName="page"
        title="Pages"
        onAdd={toggleModal}
      />
      <UpdateSiteForm saveSite={saveSite} defaultValues={defaultValues} />
      <NameModal
        title="Add Page"
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmit={createPage}
      />
    </>
  );
};

export default ClientSite;

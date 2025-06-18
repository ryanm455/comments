"use client";
import { useReducer } from "react";

import { createSiteAction } from "app/(main)/dashboard/actions";
import { Grid } from "components/ui/Grid";
import { NameModal } from "components/ui/NameModal";

import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe";

const ClientGrid = ({ gridItems }: { gridItems: any[] }) => {
  const [isOpen, toggleOpen] = useReducer((r) => !r, false);

  return (
    <div className="space-y-8">
      <Grid
        data={gridItems}
        resourceName="site"
        title="Sites"
        onAdd={toggleOpen}
        emptyState={{
          title: "No sites yet",
          description: "Create your first site to get started with building amazing web experiences.",
          icon: <FaGlobe className="w-12 h-12" />,
        }}
      />

      <NameModal
        title="Create New Site"
        isOpen={isOpen}
        onClose={toggleOpen}
        onSubmit={createSiteAction}
        placeholder="My awesome site"
        buttonText="Create Site"
        fieldLabel="Site Name"
      />
    </div>
  );
};

export default ClientGrid;

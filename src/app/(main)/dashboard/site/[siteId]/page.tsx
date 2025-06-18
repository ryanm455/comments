import { siteFilter } from "components/site/utils";
import prisma from "lib/prisma";
import {
  notFound,
  redirect,
} from "next/navigation";
import z from "zod";

import type { Prisma } from "@prisma/client";

import ClientSite from "./client";

const fetchSite = async (siteId: string): Promise<Prisma.SiteGetPayload<{
  include: {
    pages: true;
  };
}> | null> => {
  return await prisma.site.findUnique({
    where: { id: siteId },
    include: { pages: true },
  });
};

const Site = async ({ params }: { params: Promise<{ siteId: string }> }) => {
  const { siteId } = await params;
  const site = await fetchSite(siteId);
  if (!site) return notFound();

  const defaultValues = siteFilter(site);

  const saveSite = async (prevState: string | undefined, formData: FormData) => {
    "use server";

    Array.from(formData.keys()).filter(([k, v]) => k.startsWith("$")).forEach(v => formData.delete(v));

    const data: any = Object.fromEntries(formData.entries());

    data.authIcons = data.authIcons == "on"
    data.timestamps = data.timestamps == "on"
    data.ratings = data.ratings == "on"
    data.providers = data.providers ? data.providers.split(",") : []

    console.log(data)

    const result = z
      .object({
        name: z.string().min(2),
        errorColor: z.string(),
        primaryColor: z.string(),
        providers: z.string().array(),
        authIcons: z.boolean(),
        timestamps: z.boolean(),
        ratings: z.boolean(),
      })
      .safeParse(data);

    if (!result.success) return "Invalid data: " + result.error.toString();

    await prisma.site.update({
      data,
      where: { id: site.id },
    });
  };

  const createPage = async (prevState: string | undefined, formData: FormData) => {
    "use server";

    if (!formData.has("name")) return "Missing name"

    const newPage = await prisma.page.create({
      data: { name: formData.get("name")!.toString(), site: { connect: { id: site.id } } },
    });

    redirect(`/dashboard/page/${newPage.id}`);
  };

  return (
    <ClientSite
      site={site}
      defaultValues={defaultValues}
      saveSite={saveSite}
      createPage={createPage}
    />
  );
};

export default Site;

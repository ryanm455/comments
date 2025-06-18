"use server"

import prisma from "lib/prisma";

export const savePage = async (_: any, formData: FormData) => {
  "use server"

  const pageId = formData.get("id") as string;
  const name = formData.get("name") as string;

  if (!pageId || !name) return "Missing fields";

  await prisma.page.update({
    data: { name },
    where: { id: pageId },
  });
};
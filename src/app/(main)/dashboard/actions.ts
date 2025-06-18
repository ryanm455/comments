"use server"

import { auth } from "lib/auth";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";
import z from "zod";

const createSiteSchema = z.object({
    name: z
        .string()
        .min(1, "Site name is required")
        .min(2, "Site name must be at least 2 characters")
        .max(50, "Site name must be less than 50 characters")
        .trim()
        .refine(
            (name) => name.length > 0,
            "Site name cannot be empty or just whitespace"
        ),
});

export async function createSiteAction(
    prevState: string | undefined,
    formData: FormData
) {
    "use server"

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return "You must be logged in to create a site";
        }

        const data = Object.fromEntries(formData.entries());

        const result = createSiteSchema.safeParse(data);

        if (!result.success) {
            return "Missing fields"
        }

        const { name } = result.data;

        const existingSite = await prisma.site.findFirst({
            where: {
                name,
                authorId: session.user.id,
            },
        });

        if (existingSite) {
            return "A site with this name already exists";
        }

        const newSite = await prisma.site.create({
            data: {
                name,
                authorId: session.user.id,
            },
        });

        redirect(`/dashboard/site/${newSite.id}`);
    } catch (error) {
        return "Something went wrong. Please try again.";
    }
}
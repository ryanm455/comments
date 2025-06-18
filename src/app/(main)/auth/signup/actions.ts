"use server"

import prisma from "lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  "use server"

  const data = Object.fromEntries(formData.entries());

  const result = z
    .object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(6),
    })
    .safeParse(data);

  if (!result.success) return "Invalid credentials";

  const { email, name, password } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return "User already exists";

  const hashed = await Bun.password.hash(password);
  await prisma.user.create({ data: { email, name, password: hashed } });

  if (formData.has("redirectTo")) redirect(formData.get("redirectTo") as string)
}
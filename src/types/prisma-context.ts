import type { PassportContext } from "graphql-passport";
import type { NextApiRequest, NextPageContext } from "next";

import type { PrismaClient, User } from "@prisma/client";

export type PrismaContext = NextPageContext &
  PassportContext<User, NextApiRequest> & {
    prisma: PrismaClient;
  };

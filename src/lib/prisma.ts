import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

declare const global: typeof globalThis & { prisma: PrismaClient };

let prisma: PrismaClient;

const newClient = () => {
  const p = new PrismaClient();

  p.$use(async (params, next) => {
    // authentication!
    if (
      params.model === "User" &&
      params.args.data &&
      params.args.data.password
    ) {
      switch (params.action) {
        case "create":
          params.args.data.password = await bcrypt.hash(
            params.args.data.password,
            10
          );
          break;
        case "update":
          params.args.data.password = await bcrypt.hash(
            params.args.data.password,
            10
          );
          break;
      }
    }
    return next(params);
  });

  return p;
};

if (process.env.NODE_ENV === "production") {
  prisma = newClient();
} else {
  if (!global.prisma) {
    global.prisma = newClient();
  }
  prisma = global.prisma;
}

export default prisma;

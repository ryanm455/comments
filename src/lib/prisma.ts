import { PrismaClient } from "@prisma/client";

declare const global: typeof globalThis & { prisma: PrismaClient };

let prisma: PrismaClient;

const newClient = () => new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma = newClient();
} else {
  if (!global.prisma) {
    global.prisma = newClient();
  }
  prisma = global.prisma;
}

export default prisma;

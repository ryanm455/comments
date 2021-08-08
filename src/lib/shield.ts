import { rule, shield } from "graphql-shield";
import type { PrismaContext } from "types/prisma-context";

const isAuthenticated = rule({ cache: "contextual" })(
  (_, __, ctx: PrismaContext) => ctx.isAuthenticated()
);
const isUnauthenticated = rule({ cache: "contextual" })(
  (_, __, ctx: PrismaContext) => ctx.isUnauthenticated()
);

export const permissions = shield({
  Mutation: {
    login: isUnauthenticated,
    register: isUnauthenticated,
    "*": isAuthenticated,
  },
});

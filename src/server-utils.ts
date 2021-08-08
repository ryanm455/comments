import { graphql } from "graphql";
import prisma from "lib/prisma";
import { schema } from "pages/api/graphql";

export const gqlServer = (
  query: string,
  variables: object = {},
  ctx?: { req: any; res: any }
) => graphql(schema, query, undefined, { ...ctx, prisma }, variables);

export const redirect = (destination = "/") => ({
  redirect: {
    destination,
    permanent: false,
  },
});

export const notFound: { notFound: true } = {
  notFound: true,
};

export const parse = (a: any) => JSON.parse(JSON.stringify(a));

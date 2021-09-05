import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { buildContext } from "graphql-passport";
import * as types from "lib/gqlTypes";
import prisma from "lib/prisma";
import { permissions } from "lib/shield";
import middleware from "middleware";
import type {
  NextApiRequest,
  NextApiResponse,
} from "next";
import nc from "next-connect";
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
});

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ctx => buildContext({ ...ctx, prisma }),
  playground: {
    settings: {
      "request.credentials": "same-origin",
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const gqlQueryHandler = apolloServer.createHandler({
  path: "/api/graphql",
});

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(middleware).get(gqlQueryHandler).post(gqlQueryHandler);

export default handler;

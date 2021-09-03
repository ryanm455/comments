import { ValidationError } from "apollo-server-micro";
import {
  enumType,
  idArg,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from "nexus";
import { PrismaContext } from "types/prisma-context";

import { Provider } from "@prisma/client";

export const Query = queryType({
  definition(t: any) {
    t.crud.page();
    t.crud.site();
    t.crud.comment();
    t.nullable.field("me", {
      type: "User",
      resolve: (_: any, __: any, { req }: PrismaContext) => req?.user as any,
    });
    t.list.field("commentsOfPage", {
      // you could page => comment but that is more requests
      type: "Comment",
      args: { pageId: nonNull(idArg()) },
      resolve: (_: any, { pageId }: any, { prisma }: PrismaContext) =>
        prisma.comment.findMany({
          where: { pageId },
        }),
    });
  },
});

export const Mutation = mutationType({
  definition(t: any) {
    t.crud.createOneComment();
    t.crud.deleteOneUser();

    t.field("vote", {
      type: "Comment",
      args: {
        type: nonNull(
          enumType({ name: "VoteType", members: ["DOWNVOTE", "UPVOTE"] })
        ),
        commentId: idArg(),
      },
      resolve: async (
        _: any,
        { type, commentId: id }: any,
        { prisma, req: { user } }: PrismaContext
      ) => {
        let data = {};
        if (type === "UPVOTE") {
          if (user!.upvotedIds.includes(id)) {
            // already upvoted
            data = {
              upvoted: {
                disconnect: { id },
              },
            };
          } else if (user!.downvotedIds.includes(id)) {
            // downvoted so remove
            data = {
              upvoted: {
                connect: { id },
              },
              downvoted: {
                disconnect: { id },
              },
            };
          } else {
            data = {
              upvoted: {
                connect: { id },
              },
            };
          }
        } else if (type == "DOWNVOTE") {
          if (user!.downvotedIds.includes(id)) {
            // already downvoted
            data = {
              downvoted: {
                disconnect: { id },
              },
            };
          } else if (user!.upvotedIds.includes(id)) {
            // upvoted so remove
            data = {
              upvoted: {
                disconnect: { id },
              },
              downvoted: {
                connect: { id },
              },
            };
          } else {
            data = {
              downvoted: {
                connect: { id },
              },
            };
          }
        }

        await prisma.user.update({
          where: {
            id: user!.id,
          },
          data,
        });

        return prisma.comment.findUnique({ where: { id } });
      },
    });

    t.field("createOneComment", {
      type: "Comment",
      args: {
        text: nonNull(stringArg()),
        rating: intArg(),
        pageId: idArg(),
        parentCommentId: idArg(),
      },
      resolve: async (
        _: any,
        { text, rating, pageId, parentCommentId }: any,
        { prisma, req: { user } }: PrismaContext
      ) => {
        if (!pageId && !parentCommentId)
          throw new ValidationError(
            "pageId or parentCommentId must be defined!"
          );
        return prisma.comment.create({
          data: {
            text,
            rating,
            authorId: user!.id!,
            pageId,
            parentCommentId,
          },
        });
      },
    });
    t.field("login", {
      type: "User",
      args: { username: nonNull(stringArg()), password: nonNull(stringArg()) },
      resolve: async (
        _: any,
        { username, password }: any,
        ctx: PrismaContext
      ) => {
        const { user } = await ctx.authenticate("graphql-local", {
          username,
          password,
        } as any);

        if (!user) throw new Error();

        // only required if express-session is used
        ctx.login(user as any);

        return user;
      },
    });
    t.field("register", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (
        _: any,
        { username, password, name }: any,
        ctx: PrismaContext
      ) => {
        const user = await ctx.prisma.user.create({
          data: {
            username,
            name,
            password,
            provider: Provider.LOCAL,
          },
        });

        ctx.login(user as any);

        return user;
      },
    });
  },
});

export const User = objectType({
  name: "User",
  definition(t: any) {
    t.model.id();
    t.model.username();
    t.model.name();
    t.model.image();
    t.model.provider();
    t.model.providerId();
    t.model.sites();
    t.model.upvotedIds();
    t.model.upvoted();
    t.model.downvotedIds();
    t.model.downvoted();
    t.model.comments();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const Site = objectType({
  name: "Site",
  definition(t: any) {
    t.model.id();
    t.model.name();
    t.model.errorColor();
    t.model.primaryColor();
    t.model.authIcons();
    t.model.timestamps();
    t.model.ratings();
    t.model.providers();
    t.model.pages();
    t.model.author();
    t.model.authorId();
  },
});

export const Page = objectType({
  name: "Page",
  definition(t: any) {
    t.model.id();
    t.model.name();
    t.model.comments();
    t.model.site();
    t.model.siteId();
  },
});

export const Comment = objectType({
  name: "Comment",
  definition(t: any) {
    t.model.id();
    t.model.text();
    t.model.author();
    t.model.authorId();
    t.model.rating();
    t.model.parentCommentId();
    t.model.parentComment();
    t.model.children();
    t.model.upvotedByIds();
    t.model.upvotedBy();
    t.model.downvotedByIds();
    t.model.downvotedBy();
    t.model.pageId();
    t.model.page();
    t.model.createdAt();
    t.model.updatedAt();
    t.int("votes", {
      resolve({ downvotedByIds, upvotedByIds }: any) {
        return upvotedByIds.length - downvotedByIds.length;
      },
    });
    t.boolean("moreComments", {
      resolve({ id }: any, _: any, { prisma }: PrismaContext) {
        return prisma.comment
          .count({ where: { parentCommentId: id } })
          .then(r => !!r);
      },
    });
  },
});

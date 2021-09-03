import bcrypt from "bcrypt";
import { GraphQLLocalStrategy as LocalStrategy } from "graphql-passport";
import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

import { Provider } from "@prisma/client";

import prisma from "./prisma";

passport.serializeUser<any, any>((_req, user, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  done(null, user);
});

passport.use(
  new LocalStrategy(async (username: any, password: any, done: any) => {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.password) return done(null, undefined);

    if (!(await bcrypt.compare(password, user.password))) done(null, undefined);

    done(null, user);
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) => {
      const user = await prisma.user.upsert({
        update: {},
        where: { providerId: profile.id },
        create: {
          providerId: profile.id,
          provider: Provider.GOOGLE,
          name: profile.displayName,
          image: profile._json.picture,
        },
      });

      cb(null, user);
    }
  )
);

export default passport;

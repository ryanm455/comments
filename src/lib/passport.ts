import { User, UserModel } from "models";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Provider } from "types/db";

import type { DocumentType } from "@typegoose/typegoose";
import type { NativeError } from "mongoose";

passport.use(
  new LocalStrategy(
    (username: string, password: string, done: VerifyCallback) =>
      UserModel.findOne(
        { username, provider: Provider.Local },
        async (err: Error, user: DocumentType<User>) => {
          if (err) return done(err);

          !user || !(await user.verifyPassword(password))
            ? done(null, undefined)
            : done(null, user);
        }
      )
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) =>
      UserModel.findOrCreate(
        { providerId: profile.id, provider: Provider.Google },
        { name: profile.displayName, image: profile._json.picture },
        (err, user) => cb(err, user.doc)
      )
  )
);

passport.serializeUser<any, any>((_req, user, done) => done(null, user._id));

passport.deserializeUser(async (id: string, done) =>
  UserModel.findById(id, (err: NativeError, user: DocumentType<User>) =>
    done(err, user)
  )
);

export default passport;

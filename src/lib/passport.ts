import { User, UserModel } from "models";
import passport from "passport";
import GoogleStrategy, {
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import LocalStrategy from "passport-local";
import { Provider } from "types/db";

import type { DocumentType } from "@typegoose/typegoose";

passport.use(
  // @ts-ignore
  new LocalStrategy(
    (username: string, password: string, done: VerifyCallback) =>
      UserModel.findOne(
        { username, provider: Provider.Local },
        async (err: Error, user: DocumentType<User>) => {
          if (err) return done(err);
          if (!user || !(await user.verifyPassword(password)))
            return done(null, false);
          return done(null, user);
        }
      )
  )
);

passport.use(
  // @ts-ignore
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) =>
      UserModel.findOrCreate(
        { providerId: profile.id, provider: Provider.Google }, // @ts-ignore
        { name: profile.displayName, image: profile._json.picture }, // @ts-ignore
        (err: Error, user: DocumentType<User>) => cb(err, user)
      )
  )
);

// @ts-ignore
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id: string, done) =>
  done(null, await UserModel.findById(id))
);

export default passport;

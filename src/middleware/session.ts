import s from "cookie-session";

export const session = s({
  name: "session",
  secret: process.env.TOKEN_SECRET!,
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
  secureProxy: process.env.NODE_ENV === "production" ? true : undefined, // vercel secure cookies only work with secure proxy
});

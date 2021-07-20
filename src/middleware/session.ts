import s from "cookie-session";

export const session = s({
  name: "session",
  secret: process.env.TOKEN_SECRET!,
  // secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
  secureProxy: process.env.NODE_ENV === "production",
});

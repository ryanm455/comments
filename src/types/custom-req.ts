import { DocumentType } from "@typegoose/typegoose";
import { User as U } from "models";
import type { NextApiRequest } from "next";

export interface ApiRequest extends NextApiRequest {
  user?: DocumentType<U>;

  // These declarations are merged into express's Request type
  login(user: DocumentType<U>, done: (err: any) => void): void;
  login(user: DocumentType<U>, options: any, done: (err: any) => void): void;
  logIn(user: DocumentType<U>, done: (err: any) => void): void;
  logIn(user: DocumentType<U>, options: any, done: (err: any) => void): void;

  logout(): void;
  logOut(): void;

  isAuthenticated(): boolean;
  isUnauthenticated(): boolean;
}

declare global {
  namespace Express {
    interface User extends DocumentType<U> {}
  }
}

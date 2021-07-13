import { DocumentType } from "@typegoose/typegoose";
import { User } from "models";
import type { NextApiRequest } from "next";

export interface ApiRequest extends NextApiRequest {
  user?: DocumentType<User>;

  // These declarations are merged into express's Request type
  login(user: DocumentType<User>, done: (err: any) => void): void;
  login(user: DocumentType<User>, options: any, done: (err: any) => void): void;
  logIn(user: DocumentType<User>, done: (err: any) => void): void;
  logIn(user: DocumentType<User>, options: any, done: (err: any) => void): void;

  logout(): void;
  logOut(): void;

  isAuthenticated(): boolean;
  isUnauthenticated(): boolean;
}

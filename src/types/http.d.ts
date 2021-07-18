import type { IncomingMessage as IM } from "http";
import type { User as U } from "models";
import type { MongoClient } from "mongodb";
import type { DocumentType } from "@typegoose/typegoose";

declare module "http" {
  export interface IncomingMessage extends IM {
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
}

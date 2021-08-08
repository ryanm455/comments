import type { IncomingMessage as IM } from "http";

import type { User as U } from "@prisma/client";

declare module "http" {
  export interface IncomingMessage extends IM {
    user?: U;

    // These declarations are merged into express's Request type
    login(user: U, done: (err: any) => void): void;
    login(user: U, options: any, done: (err: any) => void): void;
    logIn(user: U, done: (err: any) => void): void;
    logIn(user: U, options: any, done: (err: any) => void): void;

    logout(): void;
    logOut(): void;

    isAuthenticated(): boolean;
    isUnauthenticated(): boolean;
  }
}

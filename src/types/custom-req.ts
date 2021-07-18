import type { DocumentType } from "@typegoose/typegoose";
import type { User as U } from "models";
declare global {
  namespace Express {
    interface User extends DocumentType<U> {}
  }
}

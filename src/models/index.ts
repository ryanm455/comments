import { getModelForClass } from "@typegoose/typegoose";

import { Comment } from "./Comment";
import { Page } from "./Page";
import { Site } from "./Site";
import { User } from "./User";

export const CommentModel = getModelForClass(Comment);
export const PageModel = getModelForClass(Page);
export const SiteModel = getModelForClass(Site);
export const UserModel = getModelForClass(User);

export { Comment, Page, Site, User };

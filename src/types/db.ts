export enum Provider {
  Local = "local",
  Google = "google",
  GitHub = "github",
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  image?: string;
  provider: Provider;
  providerId?: string;
  sites: ISite[];
  upvoted: Comment[];
  downvoted: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface ISite {
  _id: string;
  name: string;
  errorColor: string;
  primaryColor: string;
  authIcons: boolean;
  timestamps: boolean;
  ratings?: boolean;
  providers: Provider[];
  pages?: IPage[];
  createdAt: string;
  updatedAt: string;
}

export interface IPage {
  _id: string;
  name: string;
  comments?: IComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  text: string;
  author: IUser;
  rating?: number;
  children?: IComment[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

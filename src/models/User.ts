import bcrypt from "bcrypt";
import { Provider } from "types/db";

import {
  defaultClasses,
  DocumentType,
  getModelForClass,
  plugin,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

const saltRounds = 10;

@pre<User>("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password!, saltRounds);

    this.set("password", hash);
  }
})
@plugin(require("mongoose-findorcreate"))
export class User extends defaultClasses.FindOrCreate {
  @prop()
  public username?: string;

  @prop()
  public password?: string;

  @prop({ required: true })
  public name!: string;

  @prop()
  public image?: string;

  @prop({ required: true, type: String, enum: Provider })
  public provider!: Provider;

  @prop()
  public providerId?: string;

  @prop({ ref: () => "Site" })
  public sites?: Ref<"Site">[];

  @prop({ ref: () => "Comment" })
  public upvoted?: Ref<"Comment">[]

  @prop({ ref: () => "Comment" })
  public downvoted?: Ref<"Comment">[]

  public verifyPasswordSync(this: DocumentType<User>, password: string) {
    return bcrypt.compareSync(password, this.password!);
  }

  public async verifyPassword(this: DocumentType<User>, password: string) {
    return bcrypt.compare(password, this.password!);
  }
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

export default UserModel;

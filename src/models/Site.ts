import {
  prop,
  getModelForClass,
  defaultClasses,
  Ref,
} from "@typegoose/typegoose";
import { Provider } from "types/db";

export class Site extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ default: "rgb(220,38,38)" })
  public errorColor!: string;

  @prop({ default: "#2563EB" })
  public primaryColor!: string;

  @prop({ default: true })
  public authIcons!: boolean;

  @prop({ default: true })
  public timestamps!: boolean;

  @prop({ default: false })
  public ratings!: boolean;

  @prop({ required: true, type: String, enum: Provider })
  public providers!: Provider[];

  @prop({ ref: () => "Page" })
  public pages?: Ref<"Page">[];
}

const SiteModel = getModelForClass(Site, {
  schemaOptions: { timestamps: true },
});

export default SiteModel;

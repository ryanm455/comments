import {
  prop,
  defaultClasses,
  Ref,
  getModelForClass,
} from "@typegoose/typegoose";

export class Page extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ ref: () => "Comment" })
  public comments?: Ref<"Comment">[];
}

const PageModel = getModelForClass(Page, {
  schemaOptions: { timestamps: true },
});

export default PageModel;

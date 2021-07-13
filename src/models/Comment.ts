import {
  prop,
  defaultClasses,
  Ref,
  getModelForClass,
  pre,
} from "@typegoose/typegoose";

async function populateComments(this: any) {
  this.populate([
    "children",
    { path: "author", model: "User", select: ["provider", "name"] },
  ]);
}

@pre<Comment>("findOne", populateComments)
@pre<Comment>("find", populateComments)
export class Comment extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public text!: string;

  @prop({ ref: () => "User", required: true })
  public author!: Ref<"User">;

  @prop()
  public rating?: number;

  @prop({ ref: () => Comment })
  public children?: Ref<Comment>[];

  @prop({ default: 0 })
  public upvotes!: number;

  @prop({ default: 0 })
  public downvotes!: number;
}

const CommentModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
});

export default CommentModel;

import {
  FC,
  memo,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";

import ModifyableRatingField from "components/ModifyableRatingField";
import { Button } from "components/ui/Button";
import { HelperText } from "components/ui/HelperText";
import { Textarea } from "components/ui/Textarea";
import { createdCommentStores } from "lib/commentStore";

import { Site } from "@prisma/client";

import { addCommentAction } from "./actions";

const AddComment: FC<{
  pageId?: string;
  parentCommentId?: string;
  className?: string;
  settings: Partial<Site>
}> = memo(({ parentCommentId, pageId, className, settings }) => {
  const [text, setText] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const error = !text.length ? "You need to enter a value" : undefined;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        if (!text.length) return;

        const addComment = createdCommentStores[createdCommentStores.length - 1].getState().addComment;

        if (!addComment) alert("Not yet instantiated!")

        setSubmitting(true);

        const data = new FormData(e.currentTarget);

        const rating = settings.ratings ? (parseInt((data.get("rating") || "0").toString())) : undefined;

        const comment = await addCommentAction(text, rating, pageId, parentCommentId);


        unstable_batchedUpdates(() => {
          addComment!(comment, parentCommentId);
          setSubmitting(false);
          setText("");
          setTouched(false);
        });
      }}
      className={className}
    >
      <label className="block">
        <p className="text-base leading-4 mb-3 font-medium">
          Join the conversation
        </p>
        <Textarea
          name="text"
          placeholder="What have you got to say?"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => !touched && setTouched(true)}
          valid={touched ? (error ? false : undefined) : undefined}
        />
        <HelperText invalid={touched && error ? true : false}>
          {error}
        </HelperText>
        {settings.ratings && (
          <ModifyableRatingField name="rating" />
        )}
      </label>
      <Button type="submit" disabled={submitting} className="mt-4">
        Submit
      </Button>
    </form>
  );
});

export default AddComment;

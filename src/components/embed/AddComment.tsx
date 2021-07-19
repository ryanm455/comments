import { useState, memo } from "react";
import { FC } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Button, Label, HelperText, Textarea } from "@windmill/react-ui";
import type { IAddComment } from "types/embed";

const AddComment: FC<{
  add: IAddComment;
  commentId?: string;
}> = memo(({ add, commentId }) => {
  const [text, setText] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const error = !text.length ? "You need to enter a value" : undefined;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        if (!text.length) return;

        setSubmitting(true);

        unstable_batchedUpdates(async () => {
          try {
            await add(text, commentId);
          } catch (e) {}
          setSubmitting(false);
          setText("");
        });
      }}
    >
      <label className="block">
        <p className="text-base leading-4 mb-3 font-medium">
          Join the conversation
        </p>
        <Textarea
          placeholder="What have you got to say?"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => !touched && setTouched(true)}
          valid={touched ? (error ? false : undefined) : undefined}
        />
        <HelperText valid={false}>{touched && error ? error : null}</HelperText>
      </label>
      <Button type="submit" disabled={submitting} className="mt-4">
        Submit
      </Button>
    </form>
  );
});

export default AddComment;

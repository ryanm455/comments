import { FC, memo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { Button } from "components/ui/Button";
import { HelperText } from "components/ui/HelperText";
import { Textarea } from "components/ui/Textarea";
import type { IAddComment } from "types/embed";

const AddComment: FC<{
  add: IAddComment;
  commentId?: string;
  className?: string;
}> = memo(({ add, commentId, className }) => {
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
          placeholder="What have you got to say?"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => !touched && setTouched(true)}
          valid={touched ? (error ? false : undefined) : undefined}
        />
        <HelperText invalid={touched && error ? true : false}>
          {error}
        </HelperText>
      </label>
      <Button type="submit" disabled={submitting} className="mt-4">
        Submit
      </Button>
    </form>
  );
});

export default AddComment;

import { useState, memo } from "react";
import { FC } from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
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
      <FormControl isInvalid={!touched ? false : !!error}>
        <FormLabel htmlFor="reply">Join the conversation</FormLabel>
        <Textarea
          id="reply"
          type="text"
          placeholder="What have you got to say?"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => !touched && setTouched(true)}
        />
        <FormErrorMessage>{!touched ? false : error}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="blue" isLoading={submitting} mt={4}>
        Submit
      </Button>
    </form>
  );
});

export default AddComment;

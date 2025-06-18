"use client";

import { useActionState } from "react";

import { Button } from "components/ui/Button";
import { Field } from "components/ui/Field";

import { savePage } from "./actions";

type Props = {
  page: { id: string; name: string };
  pageId: string;
};

const PageForm = ({ page }: Props) => {
  const [status, formAction, isPending] = useActionState(savePage, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={page.id} />
      <h1 className="font-semibold text-3xl mb-4">Customize</h1>
      <Field
        field="name"
        defaultValue={page.name}
        required
      />
      <Button
        type="submit"
        className="mt-4"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save"}
      </Button>
      {status && <p className="text-sm mt-2 text-green-600">{status}</p>}
    </form>
  );
};

export default PageForm;

"use client"
import {
  memo,
  useActionState,
} from "react";

import CheckList from "components/site/CheckList";
import OptionSelect from "components/site/OptionSelect";
import ThemeSelect from "components/site/ThemeSelect";
import {
  checkListItems,
  siteFilter,
} from "components/site/utils";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { Field } from "components/ui/Field";

type Props = {
    saveSite: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>
    defaultValues: ReturnType<typeof siteFilter>
}

export const UpdateSiteForm = memo(({ saveSite, defaultValues }: Props) => {
    const [errorMessage, formAction, isPending] = useActionState(
        saveSite,
        undefined,
    );

    return (
        <form
            action={formAction}
        >
            <h1 className="font-semibold text-3xl my-4">Settings</h1>
            {errorMessage && (
                <Alert type="danger" className="mb-2">
                    {errorMessage}
                </Alert>
            )}

            <CheckList list={checkListItems.map(v => ({ ...v, defaultValue: defaultValues[v.c] as boolean }))} />

            <Field
                field="name"
                required
                className="mt-3"
                defaultValue={defaultValues.name}
            />

            <OptionSelect name="providers" defaultValue={defaultValues.providers} />

            <h1 className="font-semibold text-3xl mt-4">Theme</h1>
            {[
                ["Primary Color", "primaryColor"],
                ["Error Color", "errorColor"],
            ].map(([name, edit]: any) => (
                // @ts-ignore
                <ThemeSelect key={edit} name={edit} title={name} edit={edit} defaultValue={defaultValues[edit]} />
            ))}
            <Button
                type="submit"
                disabled={isPending}
                className="my-7"
            >
                Save
            </Button>
        </form>
    );
});

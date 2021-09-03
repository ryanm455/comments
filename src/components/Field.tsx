import { FC, useCallback, useMemo } from "react";

import classNames from "classnames";
import { HelperText } from "components/ui/HelperText";
import { Input } from "components/ui/Input";
import { useField } from "hooked-form";
import type { As } from "types/as";
import { capitalize } from "utils";

export const Field: FC<{
  field: string;
  validate: any;
  as?: As;
  className?: string;
}> = ({ field, validate, as: As = Input, className }) => {
  const [{ onChange, onBlur }, { touched, error, value }] = useField(
    field,
    validate
  );

  const onInput = useCallback(e => onChange(e.currentTarget.value), [onChange]);

  const capitalized = useMemo(() => capitalize(field), [field]);

  return (
    <label className={classNames("block", className)}>
      <p className="text-base leading-4 mb-3 font-medium">{capitalized}</p>
      <As
        placeholder={`Enter ${field}`}
        autoComplete={field}
        id={field}
        required
        value={value}
        onChange={onInput}
        onBlur={onBlur}
        valid={touched && !error && true}
      />
      <HelperText invalid={touched && error ? true : false}>{error}</HelperText>
    </label>
  );
};

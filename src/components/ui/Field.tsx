import React, {
  DetailedHTMLProps,
  FC,
  useMemo,
} from "react";

import classNames from "classnames";
import { Input } from "components/ui/Input";
import { capitalize } from "lib/utils";
import type { As } from "types/as";

export const Field: FC<{
  field: string;
  as?: As;
  className?: string;
  required?: boolean;
} & DetailedHTMLProps<React.LabelHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ field, as: As = Input, className, required = false, ...props }) => {
  const capitalized = useMemo(() => capitalize(field), [field]);

  return (
    <label className={classNames("block", className)}>
      <p className="text-base leading-4 mb-3 font-medium">{capitalized}</p>
      <As
        placeholder={`Enter ${field}`}
        autoComplete={field}
        id={field}
        name={field}
        required={required}
        {...props}
      />
    </label>
  );
};

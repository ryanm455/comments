import { useField } from "hooked-form";
import { capitalize } from "lodash-es";
import { useMemo, FC, useCallback } from "react";

import {
  As,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const Field: FC<{ field: string; validate: any; as?: As }> = ({
  field,
  validate,
  as: As = Input,
}) => {
  const [{ onChange, onBlur }, { touched, error, value }] = useField(
    field,
    validate
  );

  const onInput = useCallback(e => onChange(e.currentTarget.value), [onChange]);

  const capitalized = useMemo(() => capitalize(field), [field]);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel htmlFor={field}>{capitalized}</FormLabel>
      <As
        placeholder={`Enter ${field}`}
        autoComplete={field}
        id={field}
        required
        value={value}
        onChange={onInput}
        onBlur={onBlur}
      />
      <FormErrorMessage>{touched && error ? error : null}</FormErrorMessage>
    </FormControl>
  );
};

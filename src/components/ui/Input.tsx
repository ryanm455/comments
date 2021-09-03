import React from "react";

import classNames from "classnames";

import { hasValidation, validationStyle } from "./utils";

const INPUT_THEME = {
  base: "block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md",
  active:
    "focus:border-blue-300 border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-200 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700",
  disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
  invalid:
    "border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
  radio:
    "text-blue-500 form-radio focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-0 dark:focus:ring-gray-300",
  checkbox:
    "text-blue-500 form-checkbox focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-0 rounded dark:focus:ring-gray-300",
};

type Props = React.ComponentPropsWithRef<"input"> & {
  valid?: boolean;
  disabled?: boolean;
  type?: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { valid, disabled, className, type = "text", ...other },
  ref
) {
  const typeStyle = (type: string): string => {
    switch (type) {
      case "radio":
        return INPUT_THEME.radio;
      case "checkbox":
        return INPUT_THEME.checkbox;
      default:
        return INPUT_THEME.base;
    }
  };

  return (
    <input
      className={classNames(
        typeStyle(type),
        // don't apply activeStyle if has valid or disabled
        !hasValidation(valid) && !disabled && INPUT_THEME.active,
        // don't apply disabledStyle if has valid
        !hasValidation(valid) && disabled && INPUT_THEME.disabled,
        validationStyle(valid, "", INPUT_THEME.invalid),
        className
      )}
      type={type}
      ref={ref}
      disabled={disabled}
      {...other}
    />
  );
});

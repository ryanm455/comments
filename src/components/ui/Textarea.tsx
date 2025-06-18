import classNames from "classnames";

import {
  hasValidation,
  validationStyle,
} from "./utils";

type Props = React.ComponentProps<"textarea"> & { valid?: boolean };

const theme = {
  base: "block w-full text-sm dark:text-gray-300 rounded-md focus:outline-none",
  active:
    "focus:border-blue-300 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-blue-200",
  disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
  valid:
    "border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200",
  invalid:
    "border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
};

export const Textarea = ({
  valid,
  disabled,
  className,
  children,
  ...other
}: Props) => {
  const baseStyle = theme.base;
  const activeStyle = theme.active;
  const disabledStyle = theme.disabled;

  const cls = classNames(
    baseStyle,
    // don't apply activeStyle if has valid or disabled
    !hasValidation(valid) && !disabled && activeStyle,
    // don't apply disabledStyle if has valid
    !hasValidation(valid) && disabled && disabledStyle,
    validationStyle(valid, theme.valid, theme.invalid),
    className
  );

  return (
    <textarea className={cls} disabled={disabled} {...other}>
      {children}
    </textarea>
  );
};

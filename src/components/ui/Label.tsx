import classNames from "classnames";

const theme = {
  base: "block text-sm text-gray-700 dark:text-gray-400",
  // check and radio get this same style
  check: "inline-flex items-center",
  disabled: "opacity-50 cursor-not-allowed",
};

type Props = React.ComponentProps<"label"> & {
  check?: boolean;
  radio?: boolean;
  disabled?: boolean;
};

export const Label = ({
  children,
  check,
  radio,
  disabled,
  className,
  ...other
}: Props) => {
  const baseStyle = theme.base;
  const checkStyle = theme.check;
  const disabledStyle = theme.disabled;

  const cls = classNames(
    baseStyle,
    // check and radio are interchangeable
    (check || radio) && checkStyle,
    disabled && disabledStyle,
    className
  );

  return (
    <label className={cls} {...other}>
      {children}
    </label>
  );
};

import classNames from "classnames";

type Props = React.ComponentProps<"span"> & { invalid: boolean };

export const HelperText = ({ invalid, children, className, ...props }: Props) => {
  if (!invalid) return <></>;

  return (
    <span
      className={classNames(
        "text-xs text-red-600 dark:text-red-400",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

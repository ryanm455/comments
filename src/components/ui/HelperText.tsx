import classNames from "classnames";

export const HelperText: React.FC<
  React.ComponentProps<"span"> & { invalid: boolean }
> = ({ invalid, children, className, ...props }) => {
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

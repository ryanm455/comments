import classNames from "classnames";

export const DividerWithText: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={classNames("flex items-center text-gray-300", className)}
    {...props}
  >
    <div className="flex-1">
      <hr className="opacity-60 border-0 border-b border-solid w-full border-[currentColor]" />
    </div>
    <span className="px-3 text-gray-600 dark:text-gray-400 font-medium">
      {children}
    </span>
    <div className="flex-1">
      <hr className="opacity-60 border-0 border-b border-solid w-full border-[currentColor]" />
    </div>
  </div>
);

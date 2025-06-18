import classNames from "classnames";

import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import {
  FaExclamationCircle,
} from "@react-icons/all-files/fa/FaExclamationCircle";
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";

const theme = {
  base: "p-4 pl-12 relative leading-5",
  withClose: "pr-12",
  success: "bg-green-50 text-green-900 dark:bg-green-600 dark:text-white",
  danger: "bg-red-50 text-red-900 dark:bg-red-600 dark:text-white",
  warning: "bg-yellow-50 text-yellow-900 dark:bg-yellow-600 dark:text-white",
  neutral: "bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-600 dark:text-white",
  icon: {
    base: "h-5 w-5",
    success: "text-green-400 dark:text-green-300",
    danger: "text-red-400 dark:text-red-300",
    warning: "text-yellow-400 dark:text-yellow-100",
    neutral: "text-gray-400 dark:text-gray-500",
    info: "text-blue-400 dark:text-blue-300",
  },
};

enum AlertEnum {
  success,
  danger,
  warning,
  info,
  neutral,
}

type Props = React.ComponentProps<"div"> & {
  type?: keyof typeof AlertEnum;
  onClose?: () => void;
  rounded?: boolean;
};

export const Alert = ({
  className,
  children,
  type = "neutral",
  onClose,
  rounded = true,
  ...other
}: Props) => {
  let Icon;
  switch (type) {
    case "success":
      Icon = FaCheckCircle;
      break;
    case "warning":
      Icon = FaExclamationCircle;
      break;
    case "danger":
      Icon = FaTimesCircle;
      break;
    case "info":
      Icon = FaInfoCircle;
      break;
    case "neutral":
      Icon = FaCircle;
      break;
    default:
      Icon = FaCircle;
  }

  const cls = classNames(
    { "rounded-lg": rounded },
    theme.base,
    theme[type],
    onClose && theme.withClose,
    className
  );

  const iconCls = classNames(
    theme.icon.base,
    theme.icon[type],
    "absolute left-0 top-0 ml-4 mt-4"
  );
  const closeCls = classNames(theme.icon.base, theme.icon[type]);

  return (
    <div className={cls} role="alert" {...other}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4"
          aria-label="close"
        >
          <FaTimes className={closeCls} />
        </button>
      )}
      <Icon className={iconCls} />
      {children}
    </div>
  );
};

export default Alert;

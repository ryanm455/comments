import {
  ComponentClass,
  createElement,
  FC,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";

import classNames from "classnames";

const theme = {
  base: "min-h-[2.5rem] min-w-[2.5rem] text-base font-semibold align-middle inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-200 focus:outline-none",
  block: "w-full",
  size: {
    larger: "px-10 py-4 rounded-lg",
    large: "px-5 py-3 rounded-lg",
    regular: "px-4 py-2 rounded-lg text-sm",
    small: "px-3 py-1 rounded-md text-sm",
    icon: {
      larger: "p-4 rounded-lg",
      large: "p-3 rounded-lg",
      regular: "p-2 rounded-lg",
      small: "p-2 rounded-md",
    },
  },
  // styles applied to the SVG icon
  icon: {
    larger: "h-5 w-5",
    large: "h-5 w-5",
    regular: "h-5 w-5",
    small: "h-3 w-3",
    left: "mr-2 -ml-1",
    right: "ml-2 -mr-1",
  },
  blue: {
    base: "text-white bg-blue-500 dark:bg-blue-200 dark:text-gray-800 border border-transparent",
    active:
      "active:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-300 dark:active:bg-blue-400 focus:ring focus:ring-blue-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
  green: {
    base: "text-white bg-green-500 dark:bg-green-200 dark:text-gray-800 border border-transparent",
    active:
      "active:bg-green-700 hover:bg-green-600 dark:active:bg-green-300 focus:ring focus:ring-blue-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
  primary: {
    base: "text-gray-800 dark:text-white bg-gray-100 border border-transparent dark:bg-whiteAlpha-200",
    active:
      "active:bg-gray-300 hover:bg-gray-200 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 focus:ring focus:ring-blue-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
  outline: {
    base: "text-current border-gray-200 border focus:outline-none",
    active:
      "active:bg-gray-200 focus:ring focus:ring-blue-200 hover:bg-gray-100 dark:active:bg-whiteAlpha-300 dark:hover:bg-whiteAlpha-200",
    disabled: "opacity-50 cursor-not-allowed bg-gray-300",
  },
  link: {
    base: "text-gray-600 dark:text-gray-400 rounded h-auto !p-0",
    active:
      "hover:underline focus:ring focus:ring-gray-300 active:text-gray-800 dark:active:text-gray-500",
    disabled: "opacity-50 cursor-not-allowed",
  },
  ghost: {
    base: "text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent",
    active:
      "hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-whiteAlpha-100 active:bg-gray-200 dark:active:bg-whiteAlpha-200",
    disabled: "opacity-50 cursor-not-allowed",
  },
};

type IconType =
  | string
  | FC<{ className: string; "aria-hidden": boolean }>
  | ComponentClass<{ className: string; "aria-hidden": boolean }>;

type ButtonType = "submit" | "button";

interface Props {
  disabled?: boolean;
  type?: ButtonType;
  size?: "larger" | "large" | "regular" | "small";
  icon?: IconType;
  iconLeft?: IconType;
  iconRight?: IconType;
  layout?: keyof Omit<typeof theme, "base" | "block" | "size" | "icon">;
  block?: boolean;
}

interface ButtonAsButtonProps extends Props, HTMLAttributes<HTMLButtonElement> {
  tag?: "button";
}

interface ButtonAsAnchorProps extends Props, HTMLAttributes<HTMLLinkElement> {
  tag: "a";
  href: string;
}

interface ButtonAsOtherProps extends Props, HTMLAttributes<HTMLLinkElement> {
  tag: string | ReactNode;
  [x: string]: any;
}

type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsAnchorProps
  | ButtonAsOtherProps;

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      tag = "button",
      // Fix https://github.com/estevanmaito/windmill-react-ui/issues/7
      type = tag === "button" ? "button" : undefined,
      disabled = false,
      size = "regular",
      layout = "primary",
      block = false,
      icon,
      iconLeft,
      iconRight: IconRight,
      className,
      children,
      ...other
    },
    ref
  ) => {
    const hasIcon = !!icon || !!iconLeft || !!IconRight;

    const IconLeft = iconLeft || icon;

    const sizeStyle = theme.size[size];
    const iconSize = theme.size.icon[size];
    const iconStyle = theme.icon[size];
    const layoutStyles = theme[layout].base;
    const activeStyles = theme[layout].active;
    const disabledStyles = theme[layout].disabled;

    const buttonStyles = classNames(
      theme.base,
      // has icon but no children
      hasIcon && !children && iconSize,
      // has icon and children
      hasIcon && children && sizeStyle,
      // does not have icon
      !hasIcon && sizeStyle,
      layoutStyles,
      disabled ? disabledStyles : activeStyles,
      block ? theme.block : null,
      className
    );

    return createElement(
      tag as any,
      {
        className: buttonStyles,
        disabled,
        type,
        ref,
        ...other,
      },
      IconLeft
        ? createElement(IconLeft, {
            className: classNames(iconStyle, children ? theme.icon.left : ""),
            "aria-hidden": true,
          })
        : null,
      children,
      IconRight
        ? createElement(IconRight, {
            className: classNames(iconStyle, children ? theme.icon.right : ""),
            "aria-hidden": true,
          })
        : null
    );
  }
);

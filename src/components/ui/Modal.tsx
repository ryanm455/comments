import React, {
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

import classNames from "classnames";
import ReactModal from "react-modal";

import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

type ModalProps = {
  isOpen: boolean;
  setClose: () => any;
  contentLabel: string;
};

export const Modal = ({
  children,
  isOpen,
  setClose,
  contentLabel,
}: React.PropsWithChildren<ModalProps>) => (
  <ReactModal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={setClose}
    contentLabel={contentLabel}
    onAfterOpen={() => (document.body.style.overflow = "hidden")}
    onAfterClose={() => (document.body.style.overflow = "auto")}
    overlayClassName="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter-done"
    className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
  >
    <header className="flex justify-end">
      <button
        className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
        aria-label="close"
        onClick={setClose}
      >
        <FaTimes />
      </button>
    </header>
    {children}
  </ReactModal>
);

export const ModalHeader = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
  <p
    className={classNames("mt-4 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300", className)}
    {...props}
  />
);

export const ModalBody = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={classNames("mb-6 text-sm text-gray-700 dark:text-gray-400", className)} {...props} />
);

export const ModalFooter = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <footer
    className={classNames("flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800", className)}
    {...props}
  />
);

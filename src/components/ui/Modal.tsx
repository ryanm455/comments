import { FaTimes } from "react-icons/fa";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  setClose: () => any;
  contentLabel: string;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  setClose,
  contentLabel,
}) => (
  <ReactModal
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

export const ModalHeader: React.FC = props => (
  <p
    className="mt-4 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
    {...props}
  />
);

export const ModalBody: React.FC = props => (
  <div className="mb-6 text-sm text-gray-700 dark:text-gray-400" {...props} />
);

export const ModalFooter: React.FC = props => (
  <footer
    className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
    {...props}
  />
);

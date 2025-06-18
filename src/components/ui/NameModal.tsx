"use client";

import {
  FC,
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "./";

export type NameModalAction = (
  prevState: any,
  formData: FormData
) => Promise<any>;

interface NameModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: NameModalAction;
  placeholder?: string;
  buttonText?: string;
  fieldLabel?: string;
}

const initialState = {};

export const NameModal: FC<NameModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  placeholder = "Enter name",
  buttonText = "Create",
  fieldLabel = "Name",
}) => {
  const [state, formAction, isPending] = useActionState(onSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.reset();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} contentLabel={title} setClose={onClose}>
      <form ref={formRef} action={formAction}>
        <ModalHeader>{title}</ModalHeader>
        
        <ModalBody className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {fieldLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                state.fieldErrors?.name 
                  ? "border-red-300 bg-red-50" 
                  : "border-gray-300"
              }`}
              disabled={isPending}
              autoComplete="off"
              autoFocus
            />
            {state.fieldErrors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
            )}
          </div>

          {state.error && !state.fieldErrors && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            layout="outline"
            onClick={onClose}
            disabled={isPending}
            className="mr-3"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            layout="blue"
            disabled={isPending}
          >
            {isPending ? `${buttonText.slice(0, -1)}ing...` : buttonText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

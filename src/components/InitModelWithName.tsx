import { Dispatch, FC, memo, SetStateAction } from "react";

import { Field } from "components/Field";
import { HookedForm } from "hooked-form";

import { Button } from "./ui/Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./ui/Modal";

const InitModelWithName: FC<{
  header: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (v: object) => Promise<any>;
}> = memo(({ header, isModalOpen, setIsModalOpen, onSubmit }) => (
  <Modal
    isOpen={isModalOpen}
    contentLabel="Add dialog"
    setClose={() => setIsModalOpen(false)}
  >
    <ModalHeader>{header}</ModalHeader>
    <HookedForm onSubmit={onSubmit} validateOnBlur>
      {({ isSubmitting, handleSubmit }) => (
        <>
          <ModalBody>
            <Field
              field="name"
              validate={(v: string) => (!v ? "Name is required" : false)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              layout="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting || false}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={isSubmitting || false}
              layout="blue"
            >
              Create
            </Button>
          </ModalFooter>
        </>
      )}
    </HookedForm>
  </Modal>
));

export default InitModelWithName;

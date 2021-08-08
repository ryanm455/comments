import { Dispatch, FC, memo, SetStateAction } from "react";

import { Field } from "components/Field";
import { HookedForm } from "hooked-form";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";

const InitModelWithName: FC<{
  header: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (v: object) => Promise<any>;
}> = memo(({ header, isModalOpen, setIsModalOpen, onSubmit }) => (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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

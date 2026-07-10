import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
};

export default function AlertModal(props: ModalProps) {
    function CloseModal() {
        props.setIsOpen(false);
    }

    function StartTimer() {
        props.setIsRunning(true);
        CloseModal();
    }

  return (
    <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)}>
      <div>
        <DialogPanel>
          <DialogTitle>Notice:</DialogTitle>
          <Description>
            While the timer is active, the sites below will all be blocked and
            you cannot access them until the timer runs out.
          </Description>
          <p>Are you sure you want to proceed?</p>
          <div>
            <button onClick={CloseModal}>Cancel</button>
            <button onClick={StartTimer}>Start Timer</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

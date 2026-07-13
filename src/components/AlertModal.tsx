import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";
import "../styles/components/AlertModal.css";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onStartTimer: () => void | Promise<void>;
  mode: string;
  duration: number
};

export default function AlertModal(props: ModalProps) {
    function CloseModal() {
        props.setIsOpen(false);
    }

    async function StartTimer() {
        await chrome.runtime.sendMessage({ type: "START_TIMER", durationMs: props.duration})
        CloseModal();
        props.onStartTimer();
    }

  return (
    <Dialog className={"modal-overlay" + (props.mode === "dark" ? " darkmode" : "")} open={props.isOpen} onClose={() => props.setIsOpen(false)}>
      <div className="modal-shell">
        <DialogPanel className="modal-contents">
          <DialogTitle className="modal-title">Notice:</DialogTitle>
          <Description className="modal-description">
            While the timer is active, the sites below will all be blocked and
            you cannot access them until the timer runs out.
          </Description>
          <p className="modal-description-2">Are you sure you want to <strong>proceed</strong>?</p>
          <div className="modal-btn-group">
            <button className="modal-btn cancel" onClick={CloseModal}>Cancel</button>
            <button className="modal-btn" onClick={StartTimer}>Start Timer</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

export default function BasicModalDialog({ open, setOpen, children }) {
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ overflowY: "scroll" }}>{children}</ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

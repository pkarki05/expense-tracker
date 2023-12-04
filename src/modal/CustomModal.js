import React from "react";
import Modal from "react-bootstrap/Modal";
import SignUpForm from "../SignUpForm";

function CustomModal({
  children,show, onHide
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;

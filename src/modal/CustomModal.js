import React from "react";
import Modal from "react-bootstrap/Modal";
import SignUpForm from "../SignUpForm";

function CustomModal({
  children,show, onHide,title
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;

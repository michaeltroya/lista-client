import React from 'react';
import { Modal } from 'react-bootstrap';

const ConfirmModal = ({ deleteListOrComment, ...props }) => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h4>Are you sure you want to delete this list?</h4>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-clear" onClick={props.onHide}>
          Cancel
        </button>
        <button className="btn" onClick={deleteListOrComment}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

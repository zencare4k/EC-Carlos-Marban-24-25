import React from 'react';
import './ConfirmationDialog.css';
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
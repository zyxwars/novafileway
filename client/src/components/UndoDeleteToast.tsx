import React from "react";
import { ToastContent } from "react-toastify";

export const UndoDeleteToast: ToastContent = ({ closeToast }) => {
  return (
    <div className="flex justify-between">
      <h3>Item deleted</h3>
      <button>Undo</button>
    </div>
  );
};

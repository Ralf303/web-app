import React from "react";
import "../../styles/modal.css";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <p>{message}</p>
        <button className="modal__button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default StatusModal;

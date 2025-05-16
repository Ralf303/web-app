import React from "react";
import "../../styles/modal.css";
import { separateNumber } from "utils/helpers";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  price: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  price,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__head">Подтверждение покупки</h2>
        <p>
          Ты уверен, что хочешь купить {title} за {separateNumber(price)} стар?
        </p>
        <button className="modal__button" onClick={onClose}>
          Отмена
        </button>
        <button className="modal__button" onClick={onConfirm}>
          Купить
        </button>
      </div>
    </div>
  );
};

export default Modal;

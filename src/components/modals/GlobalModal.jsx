import React from 'react';
import { useBakeryStore } from '../../context/BakeryStoreContext';

export const GlobalModal = () => {
  const { modalState, closeModal } = useBakeryStore();

  if (!modalState.isOpen) return null;

  return (
    <div className="overlay modal-overlay open" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{modalState.title || 'Informasi'}</h3>
          <button
            className="close-btn"
            onClick={closeModal}
            aria-label="Tutup jendela modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{modalState.content}</div>
      </div>
    </div>
  );
};
export default GlobalModal;


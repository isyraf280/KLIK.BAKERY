import React from 'react';
import { useBakeryStore } from '../../context/BakeryStoreContext';

export const Toast = () => {
  const { toastMessage, isToastVisible } = useBakeryStore();

  return (
    <div className={`toast ${isToastVisible ? 'show' : ''}`} role="alert" aria-live="polite">
      <span>✨</span>
      <span>{toastMessage}</span>
    </div>
  );
};
export default Toast;

// import React, { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      window.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

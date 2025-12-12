import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

type Props = {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  width?: number | string;
};

export function Modal({ title, children, onClose, width = 480 }: Props) {
  return createPortal(
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div 
        className="modal-content"
        style={{ width }}
      >
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            {onClose && (
              <button 
                type="button" 
                className="modal-close"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import './Dialog.css';

type Props = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
};

export function ConfirmDialog({ 
  title, 
  message, 
  confirmLabel, 
  cancelLabel, 
  onConfirm, 
  onCancel,
  isDangerous = false
}: Props) {
  const { t } = useTranslation();
  return (
    <Modal title={title} onClose={onCancel} width={400}>
      <p className="dialog-message">
        {message}
      </p>
      <div className="dialog-footer">
        <button 
          type="button" 
          onClick={onCancel}
          className="dialog-btn dialog-btn-secondary"
        >
          {cancelLabel || t('common.cancel')}
        </button>
        <button 
          type="button" 
          onClick={onConfirm}
          className={`dialog-btn ${isDangerous ? 'dialog-btn-danger' : 'dialog-btn-primary'}`}
        >
          {confirmLabel || t('common.confirm')}
        </button>
      </div>
    </Modal>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';

type Props = {
  title: string;
  message: string;
  onClose: () => void;
};

export function AlertDialog({ title, message, onClose }: Props) {
  const { t } = useTranslation();
  return (
    <Modal title={title} onClose={onClose} width={400}>
      <p style={{ marginTop: 0, marginBottom: 24, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {message}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          type="button" 
          onClick={onClose}
          className="primary"
        >
          {t('common.confirm')}
        </button>
      </div>
    </Modal>
  );
}

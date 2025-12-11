import React from 'react';
import { Modal } from './Modal';

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
  confirmLabel = 'Confirm', 
  cancelLabel = 'Cancel', 
  onConfirm, 
  onCancel,
  isDangerous = false
}: Props) {
  return (
    <Modal title={title} onClose={onCancel} width={400}>
      <p style={{ marginTop: 0, marginBottom: 24, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {message}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button 
          type="button" 
          onClick={onCancel}
          style={{ background: 'transparent', border: '1px solid var(--border-color)' }}
        >
          {cancelLabel}
        </button>
        <button 
          type="button" 
          onClick={onConfirm}
          style={isDangerous ? { background: 'var(--danger)', borderColor: 'var(--danger)' } : {}}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

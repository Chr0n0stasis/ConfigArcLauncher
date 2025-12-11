import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';

type Props = {
  title: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};

export function PromptDialog({ 
  title, 
  label,
  defaultValue = '', 
  placeholder = '',
  confirmLabel, 
  cancelLabel, 
  onConfirm, 
  onCancel 
}: Props) {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm(value);
    }
  };

  return (
    <Modal title={title} onClose={onCancel} width={400}>
      <form onSubmit={handleSubmit}>
        {label && <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>{label}</label>}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%', marginBottom: 24, boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button 
            type="button" 
            onClick={onCancel}
            style={{ background: 'transparent', border: '1px solid var(--border-color)' }}
          >
            {cancelLabel || t('common.cancel')}
          </button>
          <button type="submit" disabled={!value.trim()}>
            {confirmLabel || t('common.confirm')}
          </button>
        </div>
      </form>
    </Modal>
  );
}

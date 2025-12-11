import React, { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  width?: number | string;
};

export function Modal({ title, children, onClose, width = 480 }: Props) {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,0.55)', 
        display: 'grid', 
        placeItems: 'center', 
        zIndex: 100, 
        backdropFilter: 'blur(4px)' 
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: 24, 
        borderRadius: 12, 
        width, 
        maxWidth: '90vw',
        border: '1px solid var(--border-color)', 
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' 
      }}>
        {title && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 20 }}>{title}</h3>
            {onClose && (
              <button 
                type="button" 
                onClick={onClose}
                style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}
              >
                &times;
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

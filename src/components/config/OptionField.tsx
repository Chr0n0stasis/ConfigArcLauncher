import './config.css';
import { VK_MAP, mapKeyToVK } from '../../utils/vkCodes';
import { useState } from 'react';

type Props = {
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'key';
  value: any;
  onChange: (val: any) => void;
  helper?: string;
  description?: string;
};

function OptionField({ label, type, value, onChange, helper, description }: Props) {
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isRecording) return;
    e.preventDefault();
    e.stopPropagation();
    
    const vk = mapKeyToVK(e);
    if (vk !== null) {
      onChange(vk);
      setIsRecording(false);
    }
  };

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          className="option-checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    }
    if (type === 'key') {
      const displayValue = isRecording 
        ? 'Press any key...' 
        : (VK_MAP[value as number] ? `${VK_MAP[value as number]} (0x${(value as number).toString(16).toUpperCase()})` : `0x${(value as number || 0).toString(16).toUpperCase()}`);
      
      return (
        <input
          type="text"
          className={`option-input ${isRecording ? 'recording' : ''}`}
          value={displayValue}
          readOnly
          onClick={() => setIsRecording(true)}
          onBlur={() => setIsRecording(false)}
          onKeyDown={handleKeyDown}
          style={{ cursor: 'pointer', textAlign: 'center', caretColor: 'transparent' }}
        />
      );
    }
    if (type === 'number') {
      return (
        <input
          type="number"
          className="option-input"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    }
    return (
      <input
        type="text"
        className="option-input"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  return (
    <label className="option-field">
      <div className="option-header">
        <span className="option-label">{label}</span>
        {helper && <small className="option-helper">{helper}</small>}
      </div>
      <div className="option-input-wrapper">
        {renderInput()}
        {description && (
          <div className="option-tooltip">
            {description}
          </div>
        )}
      </div>
    </label>
  );
}

export default OptionField;

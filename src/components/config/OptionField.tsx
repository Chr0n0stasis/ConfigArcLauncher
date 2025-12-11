import './config.css';

type Props = {
  label: string;
  type: 'text' | 'number' | 'checkbox';
  value: any;
  onChange: (val: any) => void;
  helper?: string;
  description?: string;
};

function OptionField({ label, type, value, onChange, helper, description }: Props) {
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

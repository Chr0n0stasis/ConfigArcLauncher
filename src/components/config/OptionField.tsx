type Props = {
  label: string;
  type: 'text' | 'number' | 'checkbox';
  value: any;
  onChange: (val: any) => void;
  helper?: string;
};

function OptionField({ label, type, value, onChange, helper }: Props) {
  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    }
    if (type === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      );
    }
    return (
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <label style={{ display: 'grid', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{label}</span>
        {helper && <small style={{ color: '#94a3b8' }}>{helper}</small>}
      </div>
      {renderInput()}
    </label>
  );
}

export default OptionField;

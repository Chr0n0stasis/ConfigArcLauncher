import { useState } from 'react';

type Props = {
  segatoolsPath: string;
};

function SettingsForm({ segatoolsPath }: Props) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={{ border: '1px solid #1f2937', padding: 12, borderRadius: 8, background: '#0f172a' }}>
      <div style={{ marginBottom: 8 }}>
        <strong>segatools.ini path:</strong> <code>{segatoolsPath}</code>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
        <span>Dark mode (local preference)</span>
      </label>
      <p style={{ color: '#94a3b8', marginTop: 8 }}>Folder opener is a stub; integrate platform-specific shell open if needed.</p>
    </div>
  );
}

export default SettingsForm;

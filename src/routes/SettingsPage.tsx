import { useEffect, useState } from 'react';
import SettingsForm from '../components/settings/SettingsForm';
import { getSegatoolsPath } from '../api/configApi';

function SettingsPage() {
  const [path, setPath] = useState<string>('./segatools.ini');

  useEffect(() => {
    getSegatoolsPath().then(setPath).catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={{ margin: '0 0 8px 0' }}>Settings</h2>
      <SettingsForm segatoolsPath={path} />
    </div>
  );
}

export default SettingsPage;

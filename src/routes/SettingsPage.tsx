import { useTranslation } from 'react-i18next';
import SettingsForm from '../components/settings/SettingsForm';

function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h2 style={{ margin: '0 0 8px 0' }}>{t('settings.title')}</h2>
      <SettingsForm />
    </div>
  );
}

export default SettingsPage;

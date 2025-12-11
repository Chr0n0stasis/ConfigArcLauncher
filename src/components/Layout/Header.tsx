import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  return (
    <header className="layout-header">
      <h1 className="layout-title">{t('common.appName')}</h1>
    </header>
  );
}

export default Header;

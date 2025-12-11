import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

function SettingsForm() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ 
      border: '1px solid var(--border-color)', 
      padding: 'var(--spacing-md)', 
      borderRadius: 'var(--radius-md)', 
      background: 'var(--bg-secondary)' 
    }}>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{t('settings.appearance')}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
        {[
          { id: 'system', label: t('settings.theme.system') },
          { id: 'light', label: t('settings.theme.light') },
          { id: 'dark', label: t('settings.theme.dark') }
        ].map((option) => (
          <div
            key={option.id}
            onClick={() => setTheme(option.id as any)}
            style={{
              cursor: 'pointer',
              border: theme === option.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-md)',
              textAlign: 'center',
              background: theme === option.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)',
              color: theme === option.id ? 'var(--accent-primary)' : 'var(--text-primary)',
              transition: 'all 0.2s ease',
              fontWeight: 600
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsForm;

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar() {
  const { t } = useTranslation();
  
  return (
    <aside className="layout-sidebar">
      <div className="layout-sidebar-title">Navigation</div>
      <NavLink 
        to="/games" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        {t('nav.games')}
      </NavLink>
      <NavLink 
        to="/config" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        {t('nav.config')}
      </NavLink>
      <NavLink 
        to="/json" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        {t('nav.json')}
      </NavLink>
      <NavLink 
        to="/settings" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        {t('nav.settings')}
      </NavLink>
    </aside>
  );
}

export default Sidebar;

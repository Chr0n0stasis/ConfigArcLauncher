import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="layout-sidebar">
      <div className="layout-sidebar-title">Navigation</div>
      <NavLink 
        to="/games" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        Games
      </NavLink>
      <NavLink 
        to="/config" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        Config Editor
      </NavLink>
      <NavLink 
        to="/settings" 
        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
      >
        Settings
      </NavLink>
    </aside>
  );
}

export default Sidebar;

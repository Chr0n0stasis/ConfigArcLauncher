import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: 'block',
  padding: '10px 12px',
  borderRadius: 6,
  color: isActive ? '#0ea5e9' : '#e5e7eb',
  background: isActive ? '#0f172a' : 'transparent',
  textDecoration: 'none',
  marginBottom: 6
});

function Sidebar() {
  return (
    <aside className="layout-sidebar">
      <div className="layout-sidebar-title">Navigation</div>
      <NavLink to="/games" style={linkStyle}>Games</NavLink>
      <NavLink to="/config" style={linkStyle}>Config Editor</NavLink>
      <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
    </aside>
  );
}

export default Sidebar;

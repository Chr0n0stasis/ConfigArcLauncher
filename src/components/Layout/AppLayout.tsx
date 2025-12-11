import Header from './Header';
import Sidebar from './Sidebar';
import './layout.css';

type Props = {
  children: React.ReactNode;
};

function AppLayout({ children }: Props) {
  return (
    <div className="layout-shell">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import GameListPage from './routes/GameListPage';
import ConfigEditorPage from './routes/ConfigEditorPage';
import SettingsPage from './routes/SettingsPage';
import JsonEditorPage from './routes/JsonEditorPage';
import AppLayout from './components/Layout/AppLayout';

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/games" element={<GameListPage />} />
          <Route path="/config" element={<ConfigEditorPage />} />
          <Route path="/json" element={<JsonEditorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/games" replace />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}

export default App;

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SegatoolsEditor from '../components/config/SegatoolsEditor';
import { useConfigState, useProfilesState } from '../state/configStore';
import { useGamesState } from '../state/gamesStore';
import { ConfigProfile } from '../types/games';
import { SegatoolsConfig } from '../types/config';
import { useToast, ToastContainer } from '../components/common/Toast';
import { PromptDialog } from '../components/common/PromptDialog';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

function ConfigEditorPage() {
  const { t } = useTranslation();
  const { config, setConfig, loading, saving, error, activeGameId, reload, save, resetToDefaults } = useConfigState();
  const { profiles, reload: reloadProfiles, saveProfile, deleteProfile, loadProfile } = useProfilesState();
  const { games } = useGamesState();
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const { toasts, showToast } = useToast();

  const [showNewProfileDialog, setShowNewProfileDialog] = useState(false);
  const [showDeleteProfileDialog, setShowDeleteProfileDialog] = useState(false);

  const activeGame = useMemo(() => games.find(g => g.id === activeGameId), [games, activeGameId]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    reloadProfiles();
  }, [reloadProfiles]);

  useEffect(() => {
    if (profiles.length > 0 && activeGameId && !initialized) {
      setInitialized(true);
      const last = localStorage.getItem(`lastProfile:${activeGameId}`);
      if (last && profiles.some(p => p.id === last)) {
        setSelectedProfileId(last);
      } else {
        // Try to find "Original INI" first, otherwise default to first
        const original = profiles.find(p => p.name === "Original INI");
        if (original) {
          setSelectedProfileId(original.id);
        } else {
          setSelectedProfileId(profiles[0].id);
        }
      }
    }
  }, [profiles, activeGameId, initialized]);

  // Removed redundant useEffect that was causing double-load issues

  const profileOptions = useMemo(() => profiles.map((p) => ({ value: p.id, label: p.name })), [profiles]);

  const handleProfileSave = async () => {
    if (!config) return;
    const profile = profiles.find((p) => p.id === selectedProfileId);
    if (!profile) {
      setShowNewProfileDialog(true);
      return;
    }
    
    const updatedProfile = {
      ...profile,
      segatools: config,
      updated_at: new Date().toISOString()
    };
    await saveProfile(updatedProfile);
    reloadProfiles();
    showToast(t('config.profileSaved'), 'success');
  };

  const handleProfileDelete = () => {
    if (!selectedProfileId) return;
    setShowDeleteProfileDialog(true);
  };

  const onConfirmDeleteProfile = async () => {
    if (!selectedProfileId) return;
    await deleteProfile(selectedProfileId);
    setSelectedProfileId('');
    if (activeGameId) localStorage.removeItem(`lastProfile:${activeGameId}`);
    reloadProfiles();
    reload();
    showToast(t('config.profileDeleted'), 'info');
    setShowDeleteProfileDialog(false);
  };

  const handleCreateProfile = () => {
    if (!config) return;
    setShowNewProfileDialog(true);
  };

  const onConfirmCreateProfile = async (name: string) => {
    if (!config || !name) return;
    const profile: ConfigProfile = {
      id: crypto.randomUUID ? crypto.randomUUID() : `profile-${Date.now()}`,
      name,
      description: '',
      segatools: config,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await saveProfile(profile);
    setSelectedProfileId(profile.id);
    if (activeGameId) localStorage.setItem(`lastProfile:${activeGameId}`, profile.id);
    reloadProfiles();
    showToast(t('config.profileCreated'), 'success');
    setShowNewProfileDialog(false);
  };

  const handleProfileLoad = async (id: string) => {
    setSelectedProfileId(id);
    if (activeGameId) {
      if (id) {
        localStorage.setItem(`lastProfile:${activeGameId}`, id);
      } else {
        localStorage.removeItem(`lastProfile:${activeGameId}`);
      }
    }
    if (!id) {
      await reload();
      showToast(t('config.loadedCurrent'), 'info');
      return;
    }
    const prof = await loadProfile(id);
    setConfig({ ...prof.segatools });
    showToast(t('config.loadedProfile', { name: prof.name }), 'info');
  };

  if (loading) return (
    <div className="empty-state">
      <h3>{t('config.loading')}</h3>
    </div>
  );

  if (!activeGameId) {
    return (
      <div className="empty-state">
        <h3>{t('config.noActiveGame')}</h3>
        <p>{t('config.activateFirst')}</p>
      </div>
    );
  }

  if (!config) return (
    <div className="empty-state">
      <h3 style={{ color: 'var(--danger)' }}>{t('common.error')}</h3>
      <p className="error-message">{error || t('config.loadError')}</p>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0' }}>
            {t('config.title')} {activeGame ? <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>— {activeGame.name}</span> : ''}
          </h2>
          <small>{t('config.subtitle')}</small>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={selectedProfileId} onChange={(e) => handleProfileLoad(e.target.value)}>
            <option value="">{t('games.currentFile')}</option>
            {profileOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button onClick={handleCreateProfile}>{t('config.newProfile')}</button>
          <button onClick={handleProfileSave}>{t('config.saveProfile')}</button>
          <button onClick={handleProfileDelete} disabled={!selectedProfileId}>{t('config.deleteProfile')}</button>
        </div>
      </div>
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      <SegatoolsEditor
        config={config}
        onChange={(next: SegatoolsConfig) => setConfig(next)}
        activeGame={activeGame}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={() => { save(config); showToast(t('config.saved'), 'success'); }} disabled={saving}>{t('config.saveConfig')}</button>
        <button onClick={resetToDefaults}>{t('config.resetDefaults')}</button>
        <button onClick={() => { reload(); showToast(t('config.reloaded'), 'info'); }}>{t('config.reloadDisk')}</button>
      </div>
      {showNewProfileDialog && (
        <PromptDialog
          title={t('config.createProfileTitle')}
          label={t('config.createProfileMessage')}
          defaultValue=""
          onConfirm={onConfirmCreateProfile}
          onCancel={() => setShowNewProfileDialog(false)}
        />
      )}
      {showDeleteProfileDialog && (
        <ConfirmDialog
          title={t('config.deleteProfileTitle')}
          message={t('config.deleteProfileMessage')}
          onConfirm={onConfirmDeleteProfile}
          onCancel={() => setShowDeleteProfileDialog(false)}
          isDangerous={true}
        />
      )}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default ConfigEditorPage;

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Game } from '../../types/games';
import { invokeTauri } from '../../api/tauriClient';

type Props = {
  game: Game;
  onSave: (game: Game) => void;
  onCancel: () => void;
};

function GameEditorDialog({ game, onSave, onCancel }: Props) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<Game>(game);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setDraft(game), [game]);

  const update = <K extends keyof Game>(key: K, value: Game[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleAutoDetect = async () => {
    setLoading(true);
    setError(null);
    try {
      const detectedGame = await invokeTauri<Game>('pick_game_folder_cmd');
      setDraft(prev => ({
        ...prev,
        name: detectedGame.name,
        executable_path: detectedGame.executable_path,
        working_dir: detectedGame.working_dir,
        launch_args: detectedGame.launch_args,
      }));
    } catch (err: any) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: 24, borderRadius: 12, width: 480, border: '1px solid var(--border-color)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>{game.id ? t('games.editor.editTitle') : t('games.editor.addTitle')}</h3>
          <button 
            type="button" 
            onClick={handleAutoDetect}
            disabled={loading}
            style={{ fontSize: 13, padding: '6px 12px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            {loading ? t('games.editor.scanning') : t('games.editor.autoDetect')}
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: 10, borderRadius: 6, marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, fontSize: 14 }}>{t('common.name')}</div>
          <input 
            value={draft.name} 
            onChange={(e) => update('name', e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', boxSizing: 'border-box' }} 
            required 
          />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, fontSize: 14 }}>{t('games.editor.execPath')}</div>
          <input 
            value={draft.executable_path} 
            onChange={(e) => update('executable_path', e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', boxSizing: 'border-box' }} 
            required 
          />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, fontSize: 14 }}>{t('games.editor.workdirOptional')}</div>
          <input 
            value={draft.working_dir ?? ''} 
            onChange={(e) => update('working_dir', e.target.value)} 
            style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', boxSizing: 'border-box' }} 
          />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, fontSize: 14 }}>{t('games.editor.launchArgs')}</div>
          <textarea 
            value={draft.launch_args.join(' ')} 
            onChange={(e) => update('launch_args', e.target.value.trim().length ? e.target.value.split(/\s+/) : [])} 
            style={{ width: '100%', height: 80, padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} 
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <input type="checkbox" checked={draft.enabled} onChange={(e) => update('enabled', e.target.checked)} style={{ width: 16, height: 16 }} />
          <span>{t('common.enabled')}</span>
        </label>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            onClick={onCancel}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: 6, cursor: 'pointer' }}
          >
            {t('common.cancel')}
          </button>
          <button 
            type="submit"
            style={{ padding: '8px 16px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
          >
            {t('games.editor.save')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameEditorDialog;

import { useEffect, useState } from 'react';
import { Game } from '../../types/games';

type Props = {
  game: Game;
  onSave: (game: Game) => void;
  onCancel: () => void;
};

function GameEditorDialog({ game, onSave, onCancel }: Props) {
  const [draft, setDraft] = useState<Game>(game);

  useEffect(() => setDraft(game), [game]);

  const update = <K extends keyof Game>(key: K, value: Game[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#0f172a', padding: 16, borderRadius: 8, width: 420, border: '1px solid #1f2937' }}>
        <h3 style={{ marginTop: 0 }}>Game</h3>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div>Name</div>
          <input value={draft.name} onChange={(e) => update('name', e.target.value)} style={{ width: '100%' }} required />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div>Executable Path</div>
          <input value={draft.executable_path} onChange={(e) => update('executable_path', e.target.value)} style={{ width: '100%' }} required />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div>Working Directory (optional)</div>
          <input value={draft.working_dir ?? ''} onChange={(e) => update('working_dir', e.target.value)} style={{ width: '100%' }} />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div>Launch Arguments (space separated)</div>
          <input
            value={draft.launch_args.join(' ')}
            onChange={(e) => update('launch_args', e.target.value.trim().length ? e.target.value.split(/\s+/) : [])}
            style={{ width: '100%' }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <input type="checkbox" checked={draft.enabled} onChange={(e) => update('enabled', e.target.checked)} />
          <span>Enabled</span>
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default GameEditorDialog;

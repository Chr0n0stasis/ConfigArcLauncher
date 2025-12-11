import { useState } from 'react';
import { Game, ConfigProfile } from '../../types/games';

type Props = {
  game: Game;
  profiles: ConfigProfile[];
  onEdit: () => void;
  onDelete: () => void;
  onLaunch: (profileId?: string) => void;
};

function GameCard({ game, profiles, onEdit, onDelete, onLaunch }: Props) {
  const [profileId, setProfileId] = useState<string>('');

  return (
    <div style={{ border: '1px solid #1f2937', borderRadius: 8, padding: 12, background: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <strong>{game.name}</strong>
          {!game.enabled && <span style={{ marginLeft: 8, color: '#f59e0b' }}>Disabled</span>}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>
        <div>Exec: {game.executable_path}</div>
        {game.working_dir && <div>Workdir: {game.working_dir}</div>}
        {game.launch_args.length > 0 && <div>Args: {game.launch_args.join(' ')}</div>}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select value={profileId} onChange={(e) => setProfileId(e.target.value)}>
          <option value="">Use current segatools.ini</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button onClick={() => onLaunch(profileId)}>Launch</button>
      </div>
    </div>
  );
}

export default GameCard;

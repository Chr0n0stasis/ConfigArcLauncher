import { useState } from 'react';
import { Game, ConfigProfile } from '../../types/games';
import './games.css';

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
    <div className="game-card">
      <div className="game-card-header">
        <div className="game-title">
          {game.name}
          {!game.enabled && <span className="game-status disabled">Disabled</span>}
        </div>
        <div className="game-actions">
          <button onClick={onEdit}>Edit</button>
          <button className="danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="game-details">
        <div>Exec: {game.executable_path}</div>
        {game.working_dir && <div>Workdir: {game.working_dir}</div>}
        {game.launch_args.length > 0 && <div>Args: {game.launch_args.join(' ')}</div>}
      </div>
      <div className="game-launch-area">
        <select 
          className="game-launch-select"
          value={profileId} 
          onChange={(e) => setProfileId(e.target.value)}
        >
          <option value="">Use current segatools.ini</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button className="primary" onClick={() => onLaunch(profileId)}>Launch</button>
      </div>
    </div>
  );
}

export default GameCard;

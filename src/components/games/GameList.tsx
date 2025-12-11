import { Game, ConfigProfile } from '../../types/games';
import GameCard from './GameCard';
import './games.css';

type Props = {
  games: Game[];
  profiles: ConfigProfile[];
  onEdit: (game: Game) => void;
  onDelete: (id: string) => Promise<void>;
  onLaunch: (id: string, profileId?: string) => void;
  onRefresh: () => void;
};

function GameList({ games, profiles, onEdit, onDelete, onLaunch }: Props) {
  if (!games.length) {
    return <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 40 }}>No games added yet.</p>;
  }

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          profiles={profiles}
          onEdit={() => onEdit(game)}
          onDelete={() => onDelete(game.id)}
          onLaunch={(profileId) => onLaunch(game.id, profileId)}
        />
      ))}
    </div>
  );
}

export default GameList;

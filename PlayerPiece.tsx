interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

interface PlayerPieceProps {
  player: Player;
}

export function PlayerPiece({ player }: PlayerPieceProps) {
  return (
    <div
      className="player-piece"
      style={{ backgroundColor: player.color }}
      title={`${player.name} - Position ${player.position}`}
    >
      {player.name.charAt(0).toUpperCase()}
    </div>
  );
}

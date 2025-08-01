import { useSnakeLadder } from "@/lib/stores/useSnakeLadder";
import { PlayerPiece } from "./PlayerPiece";
import { GameDice } from "./GameDice";
import { SNAKES, LADDERS } from "@/lib/gameLogic";

export function GameBoard() {
  const { players } = useSnakeLadder();

  // Generate board squares (1-100)
  const generateBoard = () => {
    const board = [];
    for (let row = 0; row < 10; row++) {
      const squares = [];
      for (let col = 0; col < 10; col++) {
        let squareNumber;
        if (row % 2 === 0) {
          // Even rows: left to right
          squareNumber = (9 - row) * 10 + col + 1;
        } else {
          // Odd rows: right to left
          squareNumber = (9 - row) * 10 + (9 - col) + 1;
        }
        squares.push(squareNumber);
      }
      board.push(squares);
    }
    return board;
  };

  const board = generateBoard();

  const getSquareContent = (squareNumber: number) => {
    const snake = SNAKES.find(s => s.head === squareNumber);
    const ladder = LADDERS.find(l => l.bottom === squareNumber);
    
    if (snake) return { type: 'snake', emoji: '🐍' };
    if (ladder) return { type: 'ladder', emoji: '🪜' };
    return null;
  };

  const getPlayersAtPosition = (position: number) => {
    return players.filter(player => player.position === position);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((squareNumber) => {
              const content = getSquareContent(squareNumber);
              const playersHere = getPlayersAtPosition(squareNumber);
              
              return (
                <div
                  key={squareNumber}
                  className={`board-square ${content?.type || ''}`}
                  data-square={squareNumber}
                >
                  <div className="square-number">{squareNumber}</div>
                  
                  {content && (
                    <div className="square-content">
                      <span className="content-emoji">{content.emoji}</span>
                    </div>
                  )}
                  
                  {playersHere.length > 0 && (
                    <div className="players-container">
                      {playersHere.map((player) => (
                        <PlayerPiece key={player.id} player={player} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0">
        <GameDice />
      </div>
    </div>
  );
}

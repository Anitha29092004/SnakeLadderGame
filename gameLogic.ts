// Define the structure of a player and the game
export type Player = {
  id: number;
  name: string;
  position: number;
};

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number | null;
  winner: Player | null;
  status: 'playing' | 'game-over';
};

// Map of snakes and ladders. The key is the start, the value is the end.
const snakesAndLadders: { [key: number]: number } = {
  // Ladders
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,

  // Snakes
  17: 7,
  54: 34,
  62: 19,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

// --- Core Game Functions ---

// Function to roll a 6-sided die
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to move the current player and apply game rules
export function movePlayer(state: GameState, diceValue: number): GameState {
  const { players, currentPlayerIndex } = state;
  const newPlayers = [...players];
  const currentPlayer = newPlayers[currentPlayerIndex];

  let newPosition = currentPlayer.position + diceValue;

  // Rule: Player must land exactly on the last square (100)
  if (newPosition > 100) {
    // If the move goes past 100, they stay in place for this turn.
    newPosition = currentPlayer.position;
  }
  
  // Check for snakes or ladders
  if (snakesAndLadders[newPosition]) {
    newPosition = snakesAndLadders[newPosition];
  }

  // Update the player's position
  newPlayers[currentPlayerIndex] = {
    ...currentPlayer,
    position: newPosition,
  };

  // Check for a winner
  let winner = state.winner;
  let status = state.status;
  if (newPosition === 100) {
    winner = currentPlayer;
    status = 'game-over';
  }

  // Determine the next player's turn
  const nextPlayerIndex = (currentPlayerIndex + 1) % newPlayers.length;

  // Return the updated game state
  return {
    ...state,
    players: newPlayers,
    diceValue,
    currentPlayerIndex: nextPlayerIndex,
    winner,
    status,
  };
}

// Function to reset the game to its initial state
export function resetGame(playerNames: string[]): GameState {
  const initialPlayers: Player[] = playerNames.map((name, index) => ({
    id: index,
    name,
    position: 1,
  }));

  return {
    players: initialPlayers,
    currentPlayerIndex: 0,
    diceValue: null,
    winner: null,
    status: 'playing',
  };
}
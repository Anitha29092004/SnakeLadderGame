import { create } from "zustand";
import { movePlayer, SNAKES, LADDERS } from "../gameLogic";

interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

type GameState = "setup" | "playing" | "finished";

interface SnakeLadderState {
  gameState: GameState;
  players: Player[];
  currentPlayerIndex: number;
  canRoll: boolean;
  lastRoll: number | null;
  winner: Player | null;

  // Actions
  startGame: (players: Player[]) => void;
  rollDice: () => number;
  nextTurn: () => void;
  resetGame: () => void;
}

export const useSnakeLadder = create<SnakeLadderState>((set, get) => ({
  gameState: "setup",
  players: [],
  currentPlayerIndex: 0,
  canRoll: true,
  lastRoll: null,
  winner: null,

  startGame: (players) => {
    set({
      gameState: "playing",
      players,
      currentPlayerIndex: 0,
      canRoll: true,
      lastRoll: null,
      winner: null,
    });
  },

  rollDice: () => {
    const state = get();
    if (!state.canRoll) return 0;

    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = state.players[state.currentPlayerIndex];
    
    // Calculate new position
    let newPosition = currentPlayer.position + roll;
    
    // Check if player reaches or exceeds 100
    if (newPosition >= 100) {
      newPosition = 100;
      
      // Update player position
      const updatedPlayers = state.players.map(player =>
        player.id === currentPlayer.id
          ? { ...player, position: newPosition }
          : player
      );

      // Player wins!
      set({
        players: updatedPlayers,
        lastRoll: roll,
        canRoll: false,
        winner: { ...currentPlayer, position: newPosition },
        gameState: "finished",
      });

      return roll;
    }

    // Check for snakes and ladders
    const snake = SNAKES.find(s => s.head === newPosition);
    const ladder = LADDERS.find(l => l.bottom === newPosition);

    if (snake) {
      newPosition = snake.tail;
    } else if (ladder) {
      newPosition = ladder.top;
    }

    // Update player position
    const updatedPlayers = state.players.map(player =>
      player.id === currentPlayer.id
        ? { ...player, position: newPosition }
        : player
    );

    set({
      players: updatedPlayers,
      lastRoll: roll,
      canRoll: false,
    });

    // Move to next turn after a delay
    setTimeout(() => {
      get().nextTurn();
    }, 2000);

    return roll;
  },

  nextTurn: () => {
    const state = get();
    const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    
    set({
      currentPlayerIndex: nextPlayerIndex,
      canRoll: true,
    });
  },

  resetGame: () => {
    set({
      gameState: "setup",
      players: [],
      currentPlayerIndex: 0,
      canRoll: true,
      lastRoll: null,
      winner: null,
    });
  },
}));

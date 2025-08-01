import { useState, useEffect } from "react";
import { GameSetup } from "./components/game/GameSetup";
import { GameBoard } from "./components/game/GameBoard";
import { GameHeader } from "./components/game/GameHeader";
import { WinDialog } from "./components/game/WinDialog";
import { useSnakeLadder } from "./lib/stores/useSnakeLadder";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";
import "./styles/game.css";

function App() {
  const { gameState, winner } = useSnakeLadder();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Initialize audio
  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");

    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    setBackgroundMusic(bgMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {gameState === "setup" && <GameSetup />}

        {gameState === "playing" && (
          <>
            <GameHeader />
            <GameBoard />
          </>
        )}

        {winner && <WinDialog />}
      </div>
    </div>
  );
}

export default App;

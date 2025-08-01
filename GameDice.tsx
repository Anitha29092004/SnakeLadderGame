import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSnakeLadder } from "@/lib/stores/useSnakeLadder";
import { useAudio } from "@/lib/stores/useAudio";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export function GameDice() {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const { rollDice, canRoll, lastRoll } = useSnakeLadder();
  const { playHit } = useAudio();

  const handleRoll = async () => {
    if (!canRoll || isRolling) return;

    setIsRolling(true);
    playHit();

    // Animate dice rolling
    const rollAnimation = setInterval(() => {
      setCurrentFace(Math.floor(Math.random() * 6));
    }, 100);

    // Stop animation after 1 second and show final result
    setTimeout(() => {
      clearInterval(rollAnimation);
      const result = rollDice();
      setCurrentFace(result - 1);
      setIsRolling(false);
    }, 1000);
  };

  const displayFace = isRolling ? currentFace : (lastRoll ? lastRoll - 1 : 0);

  return (
    <Card className="w-64 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <div
            className={`dice ${isRolling ? 'rolling' : ''}`}
            onClick={handleRoll}
          >
            <span className="dice-face">{DICE_FACES[displayFace]}</span>
          </div>
        </div>

        <Button
          onClick={handleRoll}
          disabled={!canRoll || isRolling}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          size="lg"
        >
          {isRolling ? "Rolling..." : canRoll ? "Roll Dice" : "Wait..."}
        </Button>

        {lastRoll && (
          <p className="text-sm text-gray-600 mt-2">
            Last roll: {lastRoll}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

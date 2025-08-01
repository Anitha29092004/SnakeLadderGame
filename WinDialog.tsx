import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSnakeLadder } from "@/lib/stores/useSnakeLadder";
import { useAudio } from "@/lib/stores/useAudio";

export function WinDialog() {
  const { winner, resetGame } = useSnakeLadder();
  const { playSuccess } = useAudio();

  useEffect(() => {
    if (winner) {
      playSuccess();
    }
  }, [winner, playSuccess]);

  if (!winner) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-green-600">
            🎉 Congratulations! 🎉
          </DialogTitle>
          <DialogDescription asChild>
            <div className="text-lg">
              <div className="flex items-center justify-center gap-2 mt-4">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: winner.color }}
                />
                <span className="font-semibold text-gray-800">{winner.name}</span>
                <span className="text-gray-600">wins the game!</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="text-center mt-6">
          <p className="text-gray-600 mb-4">
            Great job reaching square 100! 🏆
          </p>
          <Button
            onClick={resetGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

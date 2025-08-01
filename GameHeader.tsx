import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSnakeLadder } from "@/lib/stores/useSnakeLadder";
import { useAudio } from "@/lib/stores/useAudio";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

export function GameHeader() {
  const { players, currentPlayerIndex, resetGame } = useSnakeLadder();
  const { isMuted, toggleMute } = useAudio();

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="mb-6">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Snake & Ladder</h1>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <div
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: currentPlayer.color }}
                />
                <span className="text-gray-700">{currentPlayer.name}'s Turn</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className="p-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="p-2"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  player.id === currentPlayer.id ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: player.color }}
                />
                <span className="text-sm font-medium text-gray-700">{player.name}</span>
                <span className="text-sm text-gray-500">#{player.position}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

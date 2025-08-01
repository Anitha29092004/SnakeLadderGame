import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnakeLadder } from "@/lib/stores/useSnakeLadder";

const PLAYER_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

export function GameSetup() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);
  const { startGame } = useSnakeLadder();

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    const newNames = Array.from({ length: num }, (_, i) => 
      playerNames[i] || `Player ${i + 1}`
    );
    setPlayerNames(newNames);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const players = playerNames.slice(0, numPlayers).map((name, index) => ({
      id: index,
      name: name.trim() || `Player ${index + 1}`,
      position: 1,
      color: PLAYER_COLORS[index],
    }));
    startGame(players);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            🐍 Snake & Ladder 🪜
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-700 font-semibold">Number of Players</Label>
            <div className="flex gap-2 mt-2">
              {[2, 3, 4].map((num) => (
                <Button
                  key={num}
                  variant={numPlayers === num ? "default" : "outline"}
                  onClick={() => handleNumPlayersChange(num)}
                  className="flex-1"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-semibold">Player Names</Label>
            {Array.from({ length: numPlayers }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: PLAYER_COLORS[i] }}
                />
                <Input
                  value={playerNames[i] || ""}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            size="lg"
          >
            Start Game 🎲
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

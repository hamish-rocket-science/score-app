"use client";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPlayerById } from "@/lib/getPlayerById";
import { type Fixture, type Player } from "@/lib/types";
import { ResultDialog } from "./result-dialog";
import { cn } from "@/lib/utils";

type Props = {
  fixtures: Fixture[];
  onResultSave: (fixtureId: string, result: [number, number]) => void;
};

const PlayerScore = ({
  player,
  score,
  align,
}: {
  player: Player;
  score: number | undefined;
  align: "left" | "right";
}) => (
  <div
    className={cn("flex items-center gap-2", {
      "text-left flex-row": align === "left",
      "text-right flex-row-reverse": align === "right",
    })}
  >
    <span className="p-3">{player.name}</span>
    {score !== undefined ? (
      <span className="text-2xl font-bold">{score}</span>
    ) : null}
  </div>
);

export const Fixtures = ({ fixtures, onResultSave }: Props) => {
  const [showResultDialog, setShowResultDialog] = useState<boolean>(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

  const handleAddResultClick = (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setShowResultDialog(true);
  };

  const handleResultDialogClose = () => {
    setShowResultDialog(false);
    setSelectedFixture(null);
  };

  return (
    <>
      <div className="divide-y">
        {fixtures.map((fixture) => {
          const player0 = getPlayerById(fixture.players[0]);
          const player1 = getPlayerById(fixture.players[1]);

          console.log(fixture.score);

          return (
            <div
              className="flex flex-cols justify-between p-2 bg-gray-50 text-sm md:text-md items-center"
              key={fixture.id}
            >
              <div className="flex-1 flex flex-cols gap-4 items-center align-middle">
                <PlayerScore
                  player={player0}
                  score={fixture.score ? fixture.score[0] : undefined}
                  align="left"
                />

                <div className="text-center text-gray-600">v</div>
                <PlayerScore
                  player={player1}
                  score={fixture.score ? fixture.score[1] : undefined}
                  align="right"
                />
              </div>

              <div className="flex-1 flex justify-end">
                {!fixture.score ? (
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handleAddResultClick(fixture)}
                  >
                    <Plus />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon">
                    <X />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ResultDialog
        open={showResultDialog}
        fixture={selectedFixture}
        onSave={onResultSave}
        onClose={handleResultDialogClose}
      />
    </>
  );
};

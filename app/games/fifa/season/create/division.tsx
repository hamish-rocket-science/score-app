import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { divisionSchema } from "./schema";
import { DivisionPlayer } from "./division-player";

type Props = {
  divisionIndex: number;
  division: z.infer<typeof divisionSchema>;
  onDeleteDivision: (divisionNumber: number) => void;
};

export const DivisionItem = ({
  division,
  divisionIndex,
  onDeleteDivision,
}: Props) => {
  const form = useFormContext();

  function handleDeleteClick() {
    onDeleteDivision(division.number);
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex gap-4 items-center justify-between">
        <h3 className="font-bold text-md">Division {division.number}</h3>
        <Button
          type="button"
          onClick={handleDeleteClick}
          variant="ghost"
          size="icon"
        >
          <Trash2 size={16} />
        </Button>
      </header>
      <div className="flex gap-2 flex-col">
        <div>
          <FormField
            control={form.control}
            name={`divisions.${divisionIndex}`}
            render={() => (
              <FormItem className="grid sm:grid-cols-3 md:grid-cols-3 auto-rows-fr gap-2">
                {division.players.map((player, playerIndex) => (
                  <DivisionPlayer
                    key={player.id}
                    player={player}
                    playerIndex={playerIndex}
                    divisionIndex={divisionIndex}
                  />
                ))}
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

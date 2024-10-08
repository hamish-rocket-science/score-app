import { FieldError, useFormContext } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";

import { divisionSchema } from "./schema";
import { DivisionPlayer } from "./division-player";

type Props = {
  divisionIndex: number;
  division: z.infer<typeof divisionSchema>;
};

interface DivisionFieldError extends FieldError {
  players: { root: FieldError };
}

export const DivisionItem = ({ division, divisionIndex }: Props) => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <header className="flex gap-4 items-center justify-between">
        <h3 className="font-bold text-md">Division {division.number}</h3>
      </header>
      <div className="flex gap-2 flex-col">
        <div>
          <FormField
            control={form.control}
            name={`divisions.${divisionIndex}`}
            render={({ fieldState }) => {
              const error = fieldState.error as DivisionFieldError; // sorry
              const errorMessage = error?.players.root.message;

              return (
                <div className="flex flex-col gap-4">
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
                  {errorMessage ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errorMessage}
                    </p>
                  ) : null}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

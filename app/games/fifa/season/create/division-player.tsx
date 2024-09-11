import { FieldValues, useFormContext } from "react-hook-form";
import { z } from "zod";

import { PlayerAvatar } from "@/components/player-avatar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Player } from "@/lib/types";
import { cn } from "@/lib/utils";

import { divisionPlayerSchema, NewSeasonFormSchema } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  player: z.infer<typeof divisionPlayerSchema>;
  playerIndex: number;
  divisionIndex: number;
};

export type DivisionPlayerKey = `divisions.${number}.players.${number}`;

export const DivisionPlayer = ({
  player,
  divisionIndex,
  playerIndex,
}: Props) => {
  const { control, getValues, setValue } =
    useFormContext<NewSeasonFormSchema>();

  const divisions: NewSeasonFormSchema["divisions"] = getValues("divisions");

  const handleCheckedChange = (checked: boolean, field: FieldValues) => {
    field.onChange({ ...field.value, selected: checked });

    if (!checked) {
      return;
    }

    divisions.forEach((d, dIndex) => {
      // skip current division
      if (dIndex === divisionIndex) {
        return;
      }

      d.players.forEach((p, pIndex) => {
        if (p.id === player.id) {
          setValue(`divisions.${dIndex}.players.${pIndex}`, {
            ...p,
            selected: false,
          });
        }
      });
    });
  };

  return (
    <FormField
      key={player.id}
      control={control}
      name={
        `divisions.${divisionIndex}.players.${playerIndex}` as DivisionPlayerKey
      }
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex gap-2 items-center border rounded cursor-pointer outline-1 outline-gray-300 group",
            "hover:border-gray-500",
            "has-[:checked]:border-gray-900 has-[:checked]:outline",
            "has-[:focus]:border-blue-700 has-[:focus]:outline-4"
          )}
        >
          <FormLabel className="flex gap-2 items-center p-4 flex-1 justify-between">
            <span className="flex gap-2 items-center">
              <PlayerAvatar
                player={player as Player}
                className={cn(
                  "rounded-full w-4 h-4 sm:w-6 sm:h-6 grayscale",
                  "group-has-[:checked]:grayscale-0"
                )}
              />
              {player.name}
            </span>
            <FormControl>
              <Checkbox
                className="rounded-full"
                checked={field.value.selected}
                onCheckedChange={(checked: boolean) =>
                  handleCheckedChange(checked, field)
                }
              />
            </FormControl>
          </FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

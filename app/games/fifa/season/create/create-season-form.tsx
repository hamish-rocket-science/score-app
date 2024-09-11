"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useActionState, useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { Player, Season } from "@/lib/types";

import { DivisionItem } from "./division";
import { type NewSeasonFormSchema, newSeasonFormSchema } from "./schema";
import { createSeasonAction } from "./create-season-action";
import { useRouter } from "next/navigation";

type Props = {
  currentSeason: Season;
  newSeason: {
    gameId: string;
    number: number;
    divisions: {
      number: number;
      players: string[];
    }[];
  };
  allPlayers: Player[];
};

export function CreateSeasonForm({ newSeason, allPlayers }: Props) {
  const router = useRouter();

  const form = useForm<NewSeasonFormSchema>({
    resolver: zodResolver(newSeasonFormSchema),
    defaultValues: {
      number: newSeason.number,
      gameId: newSeason.gameId,
      divisions: newSeason.divisions.map((division) => ({
        number: division.number,
        players: allPlayers.map((player) => ({
          ...player,
          selected: division.players.includes(player.id),
        })),
      })),
    },
  });

  const { fields, remove } = useFieldArray({
    name: "divisions",
    control: form.control,
  });

  const [state, formAction] = useActionState(createSeasonAction, {
    success: undefined,
    message: undefined,
    seasonId: undefined,
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: NewSeasonFormSchema) => {
    startTransition(() => {
      return formAction(data);
    });
  };

  useEffect(() => {
    if (state.success === false) {
      throw new Error(state?.message);
    }

    console.log(state);

    if (state.success === true) {
      router.push(`/games/fifa/season/${state.seasonId}`);
    }
  }, [router, state]);

  function handleDeleteDivision(divisionNumber: number) {
    const index = fields.findIndex(
      (division) => division.number === divisionNumber
    );

    if (index === -1) {
      throw new Error("Division not found");
    }

    remove(index);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Divisions</h2>
            <div className="flex flex-col gap-4">
              {fields.map((division, divisionIndex) => (
                <DivisionItem
                  key={division.number}
                  division={division}
                  divisionIndex={divisionIndex}
                  onDeleteDivision={handleDeleteDivision}
                />
              ))}
            </div>
          </section>

          <Button type="submit" variant="default" size="xl">
            {isPending ? "Creating season..." : "Finish and start season"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
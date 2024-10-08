"use server";

import { supabase } from "@/lib/supabase/server";
import type { Season, Division, DivisionPlayer, Fixture } from "@/lib/types";
import { NewSeasonFormSchema } from "./schema";

type NewDivision = Omit<Division, "id">;
type NewDivisionPlayers = Omit<DivisionPlayer, "id">;
type NewFixture = Omit<
  Fixture,
  "id" | "homeScore" | "awayScore" | "dateCompleted"
>;

const deleteSeason = async (seasonId: string) =>
  await supabase.from("seasons").delete().eq("id", seasonId);

const generateFixtures = (
  players: string[],
  divisionId: string,
  seasonId: string
): NewFixture[] => {
  const numPlayers = players.length;

  if (numPlayers < 2) {
    throw new Error("At least 2 players are required to generate fixtures.");
  }

  const fixtures = [];

  for (let i = 0; i < numPlayers; i++) {
    for (let j = i + 1; j < numPlayers; j++) {
      const homeId = players[i];
      const awayId = players[j];

      fixtures.push({
        divisionId,
        seasonId,
        homePlayer: homeId,
        awayPlayer: awayId,
      });

      fixtures.push({
        divisionId,
        seasonId,
        homePlayer: awayId,
        awayPlayer: homeId,
      });
    }
  }

  return fixtures;
};

const createSeason = async (number: number, gameId: string) => {
  const { data, error } = await supabase
    .from("seasons")
    .insert([
      {
        number: number,
        game_id: gameId,
      },
    ])
    .select(`id, number, gameId:game_id`)
    .order("number", { ascending: false })
    .limit(1)
    .returns<Season[]>()
    .single();

  return { season: data, error };
};

const createDivisions = async (divisions: NewDivision[]) => {
  const { data, error } = await supabase
    .from("divisions")
    .insert(
      divisions.map((d) => ({
        game_id: d.gameId,
        season_id: d.seasonId,
        number: d.number,
      }))
    )
    .select(`id, number, gameId:game_id, seasonId:season_id`)
    .returns<Division[]>();

  return { divisions: data, error };
};

const createDivisionPlayers = async (divisionPlayers: NewDivisionPlayers[]) => {
  const { data, error } = await supabase
    .from("division_players")
    .insert(
      divisionPlayers.map((dp) => ({
        division_id: dp.divisionId,
        player_id: dp.playerId,
      }))
    )
    .select(`id, divisionId:division_id, playerId:player_id`)
    .returns<DivisionPlayer[]>();

  return { divisionPlayers: data, error };
};

const createFixtures = async (fixtures: NewFixture[]) => {
  const { data, error } = await supabase
    .from("fixtures")
    .insert(
      fixtures.map((f) => ({
        division_id: f.divisionId,
        season_id: f.seasonId,
        home_player: f.homePlayer,
        away_player: f.awayPlayer,
      }))
    )
    .select();

  return { fixtures: data, error };
};

const getNewDivisions = (formData: NewSeasonFormSchema, seasonId: string) =>
  formData.divisions.reduce<NewDivision[]>((acc, division) => {
    if (!acc.find((d) => d.number === division.number)) {
      acc.push({
        number: Number(division.number),
        gameId: formData.gameId,
        seasonId,
      });
    }

    return acc;
  }, []);

const getFixtures = (
  divisions: Division[],
  divisionPlayers: DivisionPlayer[],
  seasonId: string
): { fixtures?: NewFixture[]; error: string | null } => {
  let fixtures;

  try {
    fixtures = divisions.flatMap((division) =>
      generateFixtures(
        divisionPlayers
          .filter((dp) => dp.divisionId === division.id)
          .map((dp) => dp.playerId),
        division.id,
        seasonId
      )
    );
  } catch (error) {
    return { fixtures, error: (error as Error).message };
  }

  return { fixtures, error: null };
};

const getNewDivisionPlayers = (
  formData: NewSeasonFormSchema,
  divisions: Division[]
): NewDivisionPlayers[] =>
  formData.divisions.reduce<NewDivisionPlayers[]>((acc, div) => {
    const division = divisions.find((d) => d.number === div.number);

    if (!division) {
      return acc;
    }

    div.players.forEach((player) => {
      if (player.selected) {
        acc.push({ divisionId: division.id, playerId: player.id });
      }
    });

    return acc;
  }, []);

export type CreateSeasonActionResponse = {
  success?: boolean;
  message?: string;
  seasonId?: string;
};

export const createSeasonAction = async (
  _: CreateSeasonActionResponse,
  newSeason: NewSeasonFormSchema
): Promise<CreateSeasonActionResponse> => {
  const { gameId, number: seasonNumber } = newSeason;

  const { season, error: seasonError } = await createSeason(
    seasonNumber,
    gameId
  );

  if (!season) {
    console.error(seasonError);
    return { success: false, message: "Error creating season" };
  }

  const { divisions, error: divisionsError } = await createDivisions(
    getNewDivisions(newSeason, season.id)
  );

  if (!divisions) {
    console.error(divisionsError);
    await deleteSeason(season.id);
    return { success: false, message: "Error creating divisions" };
  }

  const { divisionPlayers, error: divisionPlayersError } =
    await createDivisionPlayers(getNewDivisionPlayers(newSeason, divisions));

  if (!divisionPlayers) {
    console.error(divisionPlayersError);
    await deleteSeason(season.id);
    return { success: false, message: "Error creating division players" };
  }

  const { fixtures: newFixtures, error: newFixturesError } = getFixtures(
    divisions,
    divisionPlayers,
    season.id
  );

  if (!newFixtures) {
    console.error(newFixturesError);
    await deleteSeason(season.id);
    return {
      success: false,
      message: "Error creating fixtures: " + newFixturesError,
    };
  }

  const { fixtures, error: fixturesError } = await createFixtures(newFixtures);

  if (!fixtures) {
    console.error(fixturesError);
    await deleteSeason(season.id);
    return {
      success: false,
      message: "Error creating fixtures: " + fixturesError,
    };
  }

  return { success: true, message: "Season created", seasonId: season.id };
};

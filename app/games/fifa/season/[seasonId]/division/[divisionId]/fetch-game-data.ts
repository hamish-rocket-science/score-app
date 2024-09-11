import { supabase } from "@/lib/supabase/server";
import { Game, Season, Division, Player, Fixture } from "@/lib/types";

export const fetchGameData = async (divisionId: string) => {
  const { data: game } = await supabase
    .from("games")
    .select()
    .eq("slug", "fifa")
    .limit(1)
    .returns<Game[]>()
    .single();

  if (!game) {
    throw new Error("FIFA not found");
  }

  const { data: seasons } = await supabase
    .from("seasons")
    .select(`id, number`)
    .order("number", { ascending: true })
    .returns<Season[]>();

  if (!seasons) {
    throw new Error("Seasons not found");
  }

  const { data: divisions } = await supabase
    .from("divisions")
    .select(`id, number, gameId:game_id, seasonId:season_id`)
    .returns<Division[]>();

  if (!divisions) {
    throw new Error("Divisions not found");
  }

  const division = divisions.find((division) => division.id === divisionId);

  if (!division) {
    throw new Error(`Division ${divisionId} not found`);
  }

  const { data: players } = await supabase
    .from("players_in_division")
    .select(`id:player_id, name:player_name, avatar:player_avatar`)
    .eq("division_id", divisionId)
    .returns<Player[]>();

  if (!players) {
    throw new Error("Players not found");
  }

  const { data: fixtures } = await supabase
    .from("fixtures")
    .select(
      `id,
      homePlayer:home_player,
      awayPlayer:away_player,
      awayScore:away_score,
      homeScore:home_score,
      dateCompleted:date_completed`
    )
    .eq("division_id", divisionId)
    .order("id", { ascending: false })
    .returns<Fixture[]>();

  if (!fixtures) {
    throw new Error("Fixtures not found");
  }

  return {
    game,
    seasons,
    players,
    fixtures,
    divisions,
    division,
  };
};

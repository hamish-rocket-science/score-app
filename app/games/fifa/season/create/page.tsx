import { PageHeader } from "@/app/page-header";
import { MaxWidth } from "@/components/max-width";

import { CreateSeasonForm } from "./create-season-form";
import { supabase } from "@/lib/supabase/server";
import { Division, Game, Player, Season } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `FIFA | Start new season`,
};

const getPlayersInDivision = async (divisionId: string): Promise<string[]> => {
  const { data: playersInDivision } = await supabase
    .from("players_in_division")
    .select("id:player_id")
    .eq("division_id", divisionId);

  if (!playersInDivision) {
    return [];
  }

  return playersInDivision
    .filter((player): player is { id: string } => player.id !== null)
    .map((player) => player.id);
};

const FIFA_GAME_ID = "08d6e716-9ae5-40aa-9bd9-2a7efcb52644";

export default async function Page() {
  const { data: currentSeason, error: currentSeasonError } = await supabase
    .from("seasons")
    .select(`gameId:game_id, number, id, createdAt:created_at`)
    .eq("game_id", FIFA_GAME_ID)
    .order("number", { ascending: false })
    .limit(1)
    .returns<Season[]>()
    .single();

  if (!currentSeason) {
    console.error(currentSeasonError);
    throw new Error("currentSeason not found");
  }

  const { data: players } = await supabase
    .from("players")
    .select()
    .returns<Player[]>();

  if (!players) {
    throw new Error("Players not found");
  }

  const { data: games } = await supabase
    .from("games")
    .select()
    .returns<Game[]>();

  if (!games) {
    throw new Error("Games not found");
  }

  const { data: divisions } = await supabase
    .from("divisions")
    .select(`id, seasonId:season_id, gameId:game_id, number`)
    .order("number", { ascending: true })
    .eq("game_id", FIFA_GAME_ID)
    .eq("season_id", currentSeason.id)
    .returns<Division[]>();

  if (!divisions) {
    throw new Error("Divisions not found");
  }

  const newSeason = {
    gameId: FIFA_GAME_ID,
    number: currentSeason.number + 1,
    divisions: await Promise.all(
      divisions.map(async (division) => {
        const playersInDivision = await getPlayersInDivision(division.id);

        return {
          number: division.number,
          players: playersInDivision,
        };
      })
    ),
  };

  return (
    <main>
      <PageHeader title={`Start Season ${newSeason.number}`} />
      <MaxWidth>
        <div className="py-8 flex flex-col gap-2">
          <CreateSeasonForm
            currentSeason={currentSeason}
            newSeason={newSeason}
            allPlayers={players}
          />
        </div>
      </MaxWidth>
    </main>
  );
}

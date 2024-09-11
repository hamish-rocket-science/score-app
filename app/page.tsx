import Link from "next/link";
import { CalendarDays, Joystick, Sheet } from "lucide-react";
import { MaxWidth } from "@/components/max-width";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/server";
import type { Division, Season } from "@/lib/types";

import { PageHeader } from "./page-header";

export const metadata = {
  title: "Games",
};

export default async function Home() {
  const { data: games } = await supabase.from("games").select();

  if (!games) {
    return null;
  }

  const { data: divisions } = await supabase
    .from("divisions")
    .select(`gameId:game_id, seasonId:season_id, id`)
    .returns<Division[]>();

  if (!divisions) {
    throw new Error("Divisions not found");
  }

  const { data: seasons } = await supabase
    .from("seasons")
    .select(`gameId:game_id, id, createdAt:created_at`)
    .returns<Season[]>();

  if (!seasons) {
    throw new Error("seasons not found");
  }

  const { data: players } = await supabase
    .from("players_in_division")
    .select(`id:player_id, divisionId:division_id`);

  if (!players) {
    throw new Error("Players not found");
  }

  return (
    <main>
      <PageHeader title="Games"></PageHeader>
      <MaxWidth>
        <div className="grid flex-col gap-8 py-8">
          <div className="grid">
            {games.map((game) => {
              const [latestSeason] = seasons
                .filter((season) => season.gameId === game.id)
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );

              const gameDivisions = divisions.filter(
                (division) => division.seasonId === latestSeason.id
              );

              const gamePlayers = players.map((player) =>
                gameDivisions.filter(
                  (division) => player.divisionId === division.id
                )
              );

              return (
                <Link href={`/games/${game.slug}`} key={game.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{game.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-row gap-8">
                        <div className="flex flex-row gap-2 items-center">
                          <CalendarDays />
                          {seasons.length} Seasons
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <Sheet />
                          {gameDivisions.length} Divisons
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <Joystick />
                          {gamePlayers.length} Players
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </MaxWidth>
    </main>
  );
}

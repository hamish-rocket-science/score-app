import type { Metadata } from "next";
import Link from "next/link";

import { CalendarDays } from "lucide-react";
import { MaxWidth } from "@/components/max-width";

import { LeagueTable, PlayerData } from "./league-table";
import { fetchGameData } from "./fetch-game-data";
import { calcTableData } from "./calc-table-data";
import { Fixtures } from "./fixtures";
import { updateScore } from "./update-score";
import { DivisionNav } from "./division-nav";
import { PageHeader } from "@/app/page-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const revalidate = 10;

type Props = {
  params: Promise<{
    seasonId: string;
    divisionId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seasonId, divisionId } = await params;
  const { game, seasons, division } = await fetchGameData(divisionId);

  const currentSeason = seasons.find((season) => season.id === seasonId);

  if (!currentSeason) {
    throw new Error("Season not found");
  }

  return {
    title: `${game.name} | Season ${currentSeason.number} | Division ${division.number}`,
  };
}

export default async function Page({ params }: Props) {
  const { seasonId, divisionId } = await params;

  const { game, seasons, players, fixtures, division, divisions } =
    await fetchGameData(divisionId);

  const currentSeason = seasons.find((season) => season.id === seasonId);

  if (!currentSeason) {
    throw new Error("Season not found");
  }

  const tableData = players.map((player) => {
    const playerData: PlayerData = {
      ...player,
      avatar: player.avatar || "",
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      for: 0,
      against: 0,
      diff: 0,
      points: 0,
    };

    return fixtures.reduce(calcTableData(player.id), playerData);
  });

  return (
    <main className="flex flex-col">
      <PageHeader title={game.name}>
        <DropdownMenu>
          <DropdownMenuTrigger className="font-medium text-gray-700 flex gap-2 items-center p-0 px-3 rounded-lg text-sm border-2">
            <span className="leading-tight mt-[2px]">
              Season {currentSeason.number}
            </span>
            <CalendarDays size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {seasons.map((season) => {
              const division = divisions
                .sort((a, b) => a.number - b.number)
                .find((division) => division.seasonId === season.id);

              if (!division) {
                return null;
              }

              return (
                <DropdownMenuItem key={season.id} asChild>
                  <Link
                    className="p-8"
                    href={`/games/fifa/season/${season.id}/division/${division.id}`}
                  >
                    Season {season.number}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button variant="secondary" asChild>
                <Link href={`/games/fifa/season/create`}>
                  Create new season
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>
      <div className="py-4">
        <MaxWidth>
          <div className="flex gap-4 flex-col">
            <DivisionNav seasonId={currentSeason.id} divisionId={divisionId} />

            <div className="flex flex-col gap-8" key={division.id}>
              <section className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl">
                  Division {division.number}
                </h2>
                <LeagueTable tableData={tableData} />
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="font-bold text-2xl">Fixtures</h3>
                <Fixtures
                  fixtures={fixtures}
                  players={players}
                  onScoreUpdate={updateScore}
                  tableData={tableData}
                />
              </section>
              <Button size="xl" asChild>
                <Link href={`/games/fifa/season/create`}>Start new season</Link>
              </Button>
            </div>
          </div>
        </MaxWidth>
      </div>
    </main>
  );
}

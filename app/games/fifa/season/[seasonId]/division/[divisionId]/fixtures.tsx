"use client";

import { Player, type Fixture as FixtureType } from "@/lib/types";

import { Card, CardContent } from "@/components/ui/card";
import { PlayerScore } from "./player-score";
import { groupFixturesIntoRounds } from "./group-fixtures";
import { useRouter } from "next/navigation";
import { PlayerData } from "./league-table";

type Props = {
  fixtures: FixtureType[];
  players: Player[];
  tableData: PlayerData[];
  onScoreUpdate: (
    fixture: FixtureType,
    playerId: string,
    score: number
  ) => void;
};

type FixtureProps = Props & {
  fixture: FixtureType;
};

const Fixture = ({
  fixture,
  players,
  fixtures,
  onScoreUpdate,
}: FixtureProps) => {
  const router = useRouter();

  const homePlayer = players.find((player) => player.id === fixture.homePlayer);
  const awayPlayer = players.find((player) => player.id === fixture.awayPlayer);

  if (!homePlayer || !awayPlayer) {
    throw new Error("player undefined");
  }

  const handleScoreUpdate = (
    fixtureId: string,
    playerId: string,
    score: number
  ) => {
    const fixture = fixtures.find((f) => f.id === fixtureId);

    if (!fixture) {
      return;
    }

    onScoreUpdate(fixture, playerId, score);

    router.refresh();
  };

  return (
    <Card key={fixture.id}>
      <CardContent className="p-4 sm:p-6 flex justify-center items-center">
        <PlayerScore
          fieldName={`${fixture.id}-${homePlayer.id}`}
          player={homePlayer}
          score={fixture.homeScore}
          venue="home"
          onScoreUpdate={(score) =>
            handleScoreUpdate(fixture.id, homePlayer.id, score)
          }
        />
        <div className="text-center text-[11px] sm:text-sm font-bold text-gray-400 w-8">
          {fixture.dateCompleted ? "FT" : "v"}
        </div>
        <PlayerScore
          fieldName={`${fixture.id}-${awayPlayer.id}`}
          player={awayPlayer}
          score={fixture.awayScore}
          venue="away"
          onScoreUpdate={(score) =>
            handleScoreUpdate(fixture.id, awayPlayer.id, score)
          }
        />
      </CardContent>
    </Card>
  );
};

type RoundProps = Props & {
  title: string;
};

const Round = ({ fixtures, title, ...props }: RoundProps) => (
  <section className="grid sm:grid-cols-1 gap-2 sm:gap-4">
    <h2 className="font-semibold">{title}</h2>
    {fixtures.map((fixture) => (
      <Fixture
        key={fixture.id}
        fixture={fixture}
        fixtures={fixtures}
        {...props}
      />
    ))}
  </section>
);

export const Fixtures = ({ fixtures, ...props }: Props) => {
  if (!fixtures) {
    return null;
  }

  const rounds: FixtureType[][] = groupFixturesIntoRounds(fixtures);

  return (
    <div className="grid sm:grid-cols-1 gap-2 sm:gap-4">
      {rounds.map((round, index) => (
        <Round
          key={index}
          title={`Round ${index + 1}`}
          fixtures={round}
          {...props}
        />
      ))}
    </div>
  );
};

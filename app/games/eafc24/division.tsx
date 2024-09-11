"use client";

import { useState } from "react";
import { Fixture } from "@/lib/types";
import { getFixtureById } from "@/lib/getFixtureById";
import { Division } from "@/lib/types";

import { LeagueTable } from "./league-table";
import { Fixtures } from "./fixtures";

type Props = {
  division: Division;
};

export const DivisionSection = ({ division }: Props) => {
  const [fixtures, setFixturesState] = useState<Fixture[]>(
    division.fixtures.map((fixture) => getFixtureById(fixture))
  );

  const handleResultSave = (fixtureId: string, score: [number, number]) => {
    setFixturesState(
      fixtures.map((fixture) => {
        if (fixture.id === fixtureId) {
          return { ...fixture, score };
        }

        return fixture;
      })
    );
  };

  return (
    <section className="flex flex-col gap-4" key={division.name}>
      <h2 className="font-bold text-2xl">{division.name}</h2>
      <LeagueTable players={division.players} />
      <Fixtures fixtures={fixtures} onResultSave={handleResultSave} />
    </section>
  );
};

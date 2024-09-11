"use client";
import { fixtures } from "@/app/data/fixtures";
import { Fixture } from "@/lib/types";

export const getFixtureById = (id: string): Fixture => {
  const fixture = fixtures.find((fixture) => fixture.id === id);

  if (!fixture) {
    throw new Error(`fixture ${id} not found`);
  }

  return fixture;
};

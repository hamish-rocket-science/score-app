"use server";

import { Tables } from "@/database.types";
import { supabase } from "@/lib/supabase/server";
import { Fixture } from "@/lib/types";

export const updateScoreAction = async (
  fixture: Fixture,
  playerId: string,
  score: number
) => {
  const column = fixture.homePlayer === playerId ? "home_score" : "away_score";
  const update: Partial<Tables<"fixtures">> = { [column]: score };
  const dateNow: string = new Date().toISOString();

  if (
    score >= 0 &&
    ((column === "home_score" &&
      fixture.awayScore !== null &&
      fixture.awayScore >= 0) ||
      (column === "away_score" &&
        fixture.homeScore !== null &&
        fixture.homeScore >= 0))
  ) {
    update["date_completed"] = dateNow;
  } else {
    update["date_completed"] = null;
  }

  const { error } = await supabase
    .from("fixtures")
    .update(update)
    .eq("id", fixture.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
};

"use server";

import { Tables } from "@/database.types";
import { supabase } from "@/lib/supabase/server";
import { Fixture } from "@/lib/types";

export const updateScore = async (
  fixture: Fixture,
  playerId: string,
  score: number
) => {
  const column = fixture.homePlayer === playerId ? "home_score" : "away_score";
  const update: Partial<Tables<"fixtures">> = { [column]: score };

  const dateNow: string = new Date().toISOString();

  if (column === "home_score" && fixture.awayScore) {
    update["date_completed"] = dateNow;
  } else if (column === "away_score" && fixture.homeScore) {
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

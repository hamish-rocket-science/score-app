import { supabase } from "@/lib/supabase/server";
import { Game, Season, Division } from "@/lib/types";

import { Redirect } from "@/components/redirect";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FIFA",
};

export default async function Page() {
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

  const { data: season } = await supabase
    .from("seasons")
    .select()
    .eq("game_id", game.id)
    .limit(1)
    .returns<Season[]>()
    .single();

  if (!season) {
    throw new Error("Season not found");
  }

  const { data: division } = await supabase
    .from("divisions")
    .select()
    .eq("season_id", season.id)
    .eq("number", 1)
    .limit(1)
    .returns<Division[]>()
    .single();

  if (!division) {
    throw new Error("Division not found");
  }

  return (
    <Redirect to={`/games/fifa/season/${season.id}/division/${division.id}`} />
  );
}

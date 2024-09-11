import { supabase } from "@/lib/supabase/server";
import { Game, Season, Division } from "@/lib/types";

import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ seasonId: string }>;
};

export const metadata = {
  title: `FIFA | Redirecting...`,
};

export default async function Page({ params }: Props) {
  const { seasonId } = await params;

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
    .eq("id", seasonId)
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

  redirect(`/games/fifa/season/${season.id}/division/${division.id}`);
}

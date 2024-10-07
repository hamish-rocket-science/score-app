"use server";

import { supabase } from "@/lib/supabase/server";

import { EditPlayerSchema } from "./edit-player-form";

export type EditPlayerActionResponse = {
  success?: boolean;
  message?: string;
};

export const editPlayerAction = async (
  _: EditPlayerActionResponse,
  player: EditPlayerSchema
): Promise<EditPlayerActionResponse> => {
  const { error } = await supabase
    .from("players")
    .update({ name: player.name })
    .eq("id", player.id);

  if (error) {
    console.error("Error editing player");
    return {
      success: false,
      message: error.message,
    };
  }

  return { success: true, message: "Player edited" };
};

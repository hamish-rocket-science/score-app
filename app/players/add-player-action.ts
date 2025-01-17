"use server";

import { supabase } from "@/lib/supabase/server";

import { type Player } from "@/lib/types";
import { NewPlayerSchema } from "./add-player-form";

export type AddPlayerActionResponse = {
  success?: boolean;
  message?: string;
  player?: Player;
};

export const addPlayerAction = async (
  _: AddPlayerActionResponse,
  newPlayer: NewPlayerSchema
): Promise<AddPlayerActionResponse> => {
  const { data, error } = await supabase
    .from("players")
    .insert([
      {
        name: newPlayer.name,
        avatar: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${newPlayer.name}`,
      },
    ])
    .select(`id, name, avatar`)
    .limit(1)
    .returns<Player[]>()
    .single();

  if (error) {
    console.error("Error creating new player");
    return {
      success: false,
      message: error.message,
      player: undefined,
    };
  }

  return { success: true, message: "Player created", player: data };
};

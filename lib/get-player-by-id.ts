import { players } from "@/app/data/players";
import { Player } from "@/lib/types";

export const getPlayerById = (id: string): Player => {
  const player = players.find((player) => player.id === id);

  if (!player) {
    throw new Error(`Player ${id} not found`);
  }

  return player;
};

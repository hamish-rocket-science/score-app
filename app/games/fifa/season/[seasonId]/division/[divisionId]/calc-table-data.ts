import { Fixture } from "@/lib/types";
import { PlayerData } from "./league-table";

export const calcTableData =
  (playerId: string) => (data: PlayerData, fixture: Fixture) => {
    if (playerId !== fixture.homePlayer && playerId !== fixture.awayPlayer) {
      return data;
    }

    if (fixture.homeScore === null || fixture.awayScore === null) {
      return data;
    }

    const isHomePlayer = fixture.homePlayer === playerId;
    const homeWin = fixture.homeScore > fixture.awayScore;
    const awayWin = fixture.homeScore < fixture.awayScore;

    // Update `data` based on whether the player is at home or away
    if (isHomePlayer) {
      data.for += fixture.homeScore;
      data.against += fixture.awayScore;
    } else {
      data.for += fixture.awayScore;
      data.against += fixture.homeScore;
    }

    // Update the win/loss/draw counts
    if ((homeWin && isHomePlayer) || (awayWin && !isHomePlayer)) {
      data.won += 1;
    } else if ((awayWin && isHomePlayer) || (homeWin && !isHomePlayer)) {
      data.lost += 1;
    } else {
      data.drawn += 1;
    }

    data.played += 1;
    data.points = data.won * 3 + data.drawn;
    data.diff = data.for - data.against;

    return data;
  };

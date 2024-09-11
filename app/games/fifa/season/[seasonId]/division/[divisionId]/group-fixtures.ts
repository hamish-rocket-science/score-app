import { Fixture } from "@/lib/types";

export function groupFixturesIntoRounds(fixtures: Fixture[]): Fixture[][] {
  // Get the unique set of players from homePlayer and awayPlayer
  const playerSet = new Set<string>();
  fixtures.forEach((fixture) => {
    playerSet.add(fixture.homePlayer);
    playerSet.add(fixture.awayPlayer);
  });

  const totalPlayers = playerSet.size;

  if (totalPlayers % 2 !== 0) {
    throw new Error(
      "Total number of players must be even to form proper rounds."
    );
  }

  const fixturesPerRound = totalPlayers / 2;
  const rounds: Fixture[][] = [];
  const usedFixtures = new Set<Fixture>();

  while (usedFixtures.size < fixtures.length) {
    const currentRound: Fixture[] = [];
    const currentPlayersInRound = new Set<string>();

    for (const fixture of fixtures) {
      if (!usedFixtures.has(fixture)) {
        const { homePlayer, awayPlayer } = fixture;

        // Ensure both players are not in the current round already
        if (
          !currentPlayersInRound.has(homePlayer) &&
          !currentPlayersInRound.has(awayPlayer)
        ) {
          currentRound.push(fixture);
          currentPlayersInRound.add(homePlayer);
          currentPlayersInRound.add(awayPlayer);
          usedFixtures.add(fixture);

          // When the round is complete, break the loop
          if (currentRound.length === fixturesPerRound) {
            break;
          }
        }
      }
    }

    // If we couldn't complete the round, break the loop
    if (currentRound.length < fixturesPerRound) {
      break;
    }

    rounds.push(currentRound);
  }

  return rounds;
}

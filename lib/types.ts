export type Player = {
  avatar: string | undefined;
  id: string;
  name: string;
};

export type Game = {
  id: string;
  name: string;
  slug: string;
};

export type Division = {
  id: string;
  number: number;
  gameId: string;
  seasonId: string;
};

export type DivisionPlayer = {
  id: string;
  divisionId: string;
  playerId: string;
};

export type Season = {
  id: string;
  number: number;
  gameId: string;
  createdAt: string;
};

export type Fixture = {
  id: string;
  divisionId: string;
  seasonId: string;
  homeScore: number | null;
  awayScore: number | null;
  homePlayer: string;
  awayPlayer: string;
  dateCompleted: string | null;
};

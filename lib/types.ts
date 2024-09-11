export type Player = {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  avatar: string;
};

export type Division = {
   id: string;
  name: string;
  players: string[];
  fixtures: string[];
};

export type Fixture = {
  id: string;
  players: [string, string];
  dateCompleted: Date | null;
  score: [number, number] | null;
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { PlayerAvatar } from "@/components/player-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  tableData: PlayerData[];
};

export type PlayerData = {
  id: string;
  name: string;
  avatar: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  for: number;
  against: number;
  diff: number;
  points: number;
};

const PlayerRow = ({ player }: { player: PlayerData }) => (
  <TableRow key={player.name}>
    <TableCell className="flex gap-2 items-center">
      <PlayerAvatar player={player} />
      <span className="font-sans font-medium">{player.name}</span>
    </TableCell>
    <TableCell>{player.played}</TableCell>
    <TableCell>{player.won}</TableCell>
    <TableCell>{player.drawn}</TableCell>
    <TableCell>{player.lost}</TableCell>
    <TableCell>{player.for}</TableCell>
    <TableCell>{player.against}</TableCell>
    <TableCell>{player.diff}</TableCell>
    <TableCell className="text-right">{player.points}</TableCell>
  </TableRow>
);

export function LeagueTable({ tableData }: Props) {
  return (
    <Card>
      <ScrollArea className="w-full">
        <Table className="text-xs md:text-md">
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>
                <abbr title="Games played">GP</abbr>
              </TableHead>
              <TableHead>
                <abbr title="Won">W</abbr>
              </TableHead>
              <TableHead>
                <abbr title="Drawn">D</abbr>
              </TableHead>
              <TableHead>
                <abbr title="Lost">L</abbr>
              </TableHead>
              <TableHead>
                <abbr title="For">F</abbr>
              </TableHead>
              <TableHead>
                <abbr title="Against">A</abbr>
              </TableHead>
              <TableHead>
                <abbr title="Goal difference">GD</abbr>
              </TableHead>
              <TableHead className="text-right">
                <abbr title="Points">Pts</abbr>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData
              .sort((a, b) => b.points - a.points)
              .map((player) => (
                <PlayerRow player={player} key={player.id} />
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}

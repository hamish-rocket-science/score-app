import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPlayerById } from "@/lib/getPlayerById";

export function LeagueTable({ players }: { players: string[] }) {
  return (
    <Table className="bg-gray-50 text-sm md:text-md">
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
        {players.map((playerId) => {
          const player = getPlayerById(playerId);
          return (
            <TableRow key={player.name}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.played}</TableCell>
              <TableCell>{player.won}</TableCell>
              <TableCell>{player.drawn}</TableCell>
              <TableCell>{player.lost}</TableCell>
              <TableCell>{player.goalsFor}</TableCell>
              <TableCell>{player.goalsAgainst}</TableCell>
              <TableCell>{player.goalsFor - player.goalsAgainst}</TableCell>
              <TableCell className="text-right">{player.points}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

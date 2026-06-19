import { getTeamRoster } from '@/lib/mlb-api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const GUARDIANS_TEAM_ID = 114;

export default async function PlayersPage() {
  const roster = await getTeamRoster(GUARDIANS_TEAM_ID);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Cleveland Guardians Roster</h1>
      <p className="text-muted-foreground mb-8">
        Active roster from MLB Stats API
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roster.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.primaryNumber || '—'}</TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`/players/${player.id}`}
                  className="hover:underline hover:text-primary"
                >
                  {player.fullName}
                </Link>
              </TableCell>
              <TableCell>{player.position.abbreviation}</TableCell>
              <TableCell>{player.status.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
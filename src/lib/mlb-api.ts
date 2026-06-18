const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

export type Player = {
  id: number;
  fullName: string;
  primaryNumber?: string;
  position: { abbreviation: string; name: string };
  status: { description: string };
};

export async function getTeamRoster(teamId: number): Promise<Player[]> {
  const res = await fetch(`${MLB_API_BASE}/teams/${teamId}/roster?rosterType=active`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) throw new Error('Failed to fetch roster');

  const data = await res.json();
  return data.roster.map((entry: any) => ({
    id: entry.person.id,
    fullName: entry.person.fullName,
    primaryNumber: entry.jerseyNumber,
    position: entry.position,
    status: entry.status,
  }));
}
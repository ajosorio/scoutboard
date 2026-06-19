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

export type PlayerDetails = {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    primaryNumber?: string;
    birthDate?: string;
    currentAge?: number;
    birthCity?: string;
    birthCountry?: string;
    height?: string;
    weight?: number;
    primaryPosition: { abbreviation: string; name: string };
    batSide?: { description: string };
    pitchHand?: { description: string };
    mlbDebutDate?: string;
    active: boolean;
}

export async function getPlayerDetails(
  playerId: number
): Promise<PlayerDetails | null> {
  const res = await fetch(
    `${MLB_API_BASE}/people/${playerId}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (!data.people || data.people.length === 0) return null;

  const person = data.people[0];

  return {
    id: person.id,
    fullName: person.fullName,
    firstName: person.firstName,
    lastName: person.lastName,
    primaryNumber: person.primaryNumber,
    birthDate: person.birthDate,
    currentAge: person.currentAge,
    birthCity: person.birthCity,
    birthCountry: person.birthCountry,
    height: person.height,
    weight: person.weight,
    primaryPosition: person.primaryPosition,
    batSide: person.batSide,
    pitchHand: person.pitchHand,
    mlbDebutDate: person.mlbDebutDate,
    active: person.active,
  };
}
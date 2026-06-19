import { getPlayerDetails } from '@/lib/mlb-api';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const playerId = parseInt(id);

  const player = await getPlayerDetails(playerId);

  if (!player) {
    notFound();
  }

  const photoUrl = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={photoUrl}
          alt={player.fullName}
          className="w-48 h-48 rounded-lg object-cover bg-muted"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{player.fullName}</h1>
          <div className="flex gap-2 items-center flex-wrap">
            <Badge variant="outline">{player.primaryPosition.name}</Badge>
            {player.primaryNumber && (
              <Badge variant="secondary">#{player.primaryNumber}</Badge>
            )}
            {player.active && <Badge>Active</Badge>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {player.currentAge && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age</span>
                <span className="font-medium">{player.currentAge}</span>
              </div>
            )}
            {player.height && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height</span>
                <span className="font-medium">{player.height}</span>
              </div>
            )}
            {player.weight && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight</span>
                <span className="font-medium">{player.weight} lbs</span>
              </div>
            )}
            {player.batSide && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bats</span>
                <span className="font-medium">{player.batSide.description}</span>
              </div>
            )}
            {player.pitchHand && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Throws</span>
                <span className="font-medium">{player.pitchHand.description}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {player.birthDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Born</span>
                <span className="font-medium">{player.birthDate}</span>
              </div>
            )}
            {player.birthCity && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Birthplace</span>
                <span className="font-medium">
                  {player.birthCity}
                  {player.birthCountry && `, ${player.birthCountry}`}
                </span>
              </div>
            )}
            {player.mlbDebutDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">MLB Debut</span>
                <span className="font-medium">{player.mlbDebutDate}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
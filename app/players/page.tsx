import { supabase } from "@/lib/supabase/server";
import { Player } from "@/lib/types";
import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../page-header";
import { PlayerAvatar } from "@/components/player-avatar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Players",
};

const PlayersPage = async () => {
  const { data: players } = await supabase
    .from("players")
    .select()
    .returns<Player[]>();

  if (!players) {
    throw new Error("Players not found");
  }

  return (
    <main>
      <PageHeader title="Players">
        <Button>Add Player</Button>
      </PageHeader>
      <MaxWidth>
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {players.map((player) => (
              <div key={player.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <PlayerAvatar player={player} />
                  <h2 className="text-lg font-semibold">{player.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidth>
    </main>
  );
};

export default PlayersPage;

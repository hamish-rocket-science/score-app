import { supabase } from "@/lib/supabase/server";
import { Player } from "@/lib/types";
import { MaxWidth } from "@/components/max-width";
import { PageHeader } from "../page-header";
import { AddPlayerDialog } from "./add-player-dialog";
import { EditPlayerDialog } from "./edit-player-dialog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Players",
};

const PlayersPage = async () => {
  const { data: players } = await supabase
    .from("players")
    .select()
    .order("created_at", { ascending: true })
    .returns<Player[]>();

  if (!players) {
    throw new Error("Players not found");
  }

  return (
    <main>
      <PageHeader title="Players">
        <AddPlayerDialog />
      </PageHeader>
      <MaxWidth>
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {players.map((player) => (
              <EditPlayerDialog player={player} key={player.id} />
            ))}
          </div>
        </div>
      </MaxWidth>
    </main>
  );
};

export default PlayersPage;

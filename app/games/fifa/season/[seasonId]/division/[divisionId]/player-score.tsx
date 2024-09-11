import { Player } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PlayerAvatar } from "@/components/player-avatar";

type Venue = "home" | "away";

type Props = {
  player: Player;
  score: number | null;
  fieldName: string;
  venue: Venue;
  onScoreUpdate: (score: number) => void;
};

export const PlayerScore = ({
  player,
  score,
  venue,
  fieldName,
  onScoreUpdate,
}: Props) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onScoreUpdate(parseInt(e.currentTarget.value));
  };

  return (
    <div
      className={cn("flex items-center gap-2 sm:gap-3 flex-1 justify-end", {
        "text-right flex-row": venue === "home",
        "text-left flex-row-reverse": venue === "away",
      })}
    >
      <div className="flex flex-col">
        <label className="font-bold text-sm sm:text-xl" htmlFor={fieldName}>
          {player.name}
        </label>
      </div>
      <PlayerAvatar player={player} />
      <Input
        min="0"
        max="9"
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        id={fieldName}
        name={fieldName}
        defaultValue={score?.toString()}
        onChange={handleChange}
        className="rounded-none p-0 w-8 h-10 sm:w-12 text-2xl sm:text-4xl md:w-16 font-mono font-medium text-center placeholder:text-gray-200 border-0 focus:border hover:border"
        placeholder="0"
      />
    </div>
  );
};

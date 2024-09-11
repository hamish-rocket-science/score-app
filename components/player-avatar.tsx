import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player } from "@/lib/types";

type Props = {
  player: Player;
  className?: string;
};

export const PlayerAvatar = ({ player, ...props }: Props) => (
  <Avatar {...props}>
    <AvatarImage src={player.avatar ?? ""} alt="" />
    <AvatarFallback>{player.name.substring(0, 1)}</AvatarFallback>
  </Avatar>
);

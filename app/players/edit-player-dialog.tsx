"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { editPlayerAction } from "./edit-player-action";
import { type Player } from "@/lib/types";
import { EditPlayerForm } from "./edit-player-form";
import { PlayerAvatar } from "@/components/player-avatar";
import { ChevronRight } from "lucide-react";

type Props = {
  player: Player;
};

export const EditPlayerDialog = ({ player }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [state, formAction] = useActionState(editPlayerAction, {
    success: undefined,
    message: undefined,
  });

  useEffect(() => {
    if (state.success === false) {
      throw new Error(state?.message);
    }

    if (state.success === true) {
      setOpen(false);
      router.refresh();
    }
  }, [router, state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="xl"
          key={player.id}
          className="bg-white border rounded-lg p-8"
        >
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <PlayerAvatar player={player} />
              <h2 className="text-lg font-semibold">{player.name}</h2>
            </div>
            <ChevronRight />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {player.name}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Edit {player.name}</DialogDescription>
          </VisuallyHidden>
          <EditPlayerForm player={player} onSubmit={formAction} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

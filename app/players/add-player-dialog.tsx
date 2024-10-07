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

import { AddPlayerForm } from "./add-player-form";
import { useActionState, useEffect, useState } from "react";
import { addPlayerAction } from "./add-player-action";
import { useRouter } from "next/navigation";

export const AddPlayerDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [state, formAction] = useActionState(addPlayerAction, {
    success: undefined,
    message: undefined,
    player: undefined,
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
        <Button>Add Player</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add player</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add player</DialogDescription>
          </VisuallyHidden>
          <AddPlayerForm onSubmit={formAction} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";

import { getPlayerById } from "@/lib/getPlayerById";
import { Fixture } from "@/lib/types";
import { ScoreInputField } from "./score-input-field";

type Props = {
  open: boolean;
  onSave: (fixtureId: string, result: [number, number]) => void;
  onClose: () => void;
  fixture: Fixture | null;
};

const formSchema = z.object({
  result: z.tuple([z.string().min(1), z.string().min(1)]),
});

type Values = z.infer<typeof formSchema>;

export const ResultDialog = ({ open, fixture, onSave, onClose }: Props) => {
  const form = useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: { result: ["", ""] },
  });

  if (!fixture) {
    return null;
  }

  const player0 = getPlayerById(fixture.players[0]);
  const player1 = getPlayerById(fixture.players[1]);

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const handleSubmit = ({ result }: Values) => {
    if (!fixture) {
      throw new Error("Fixture is null");
    }

    onSave(fixture?.id, [parseInt(result[0]), parseInt(result[1])]);
    handleClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DrawerHeader>
              <DrawerTitle>
                {player0.name} v {player1.name}
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-8">
              <div className="flex flex-row items-center justify-between">
                <ScoreInputField control={form.control} name="result.0">
                  {player0.name}
                </ScoreInputField>
                <span>v</span>
                <ScoreInputField control={form.control} name="result.1" reverse>
                  {player1.name}
                </ScoreInputField>
              </div>
            </div>
            <DrawerFooter>
              <div className="flex flex-col gap-4">
                <Button variant="outline" size="lg" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={!form.formState.isValid}
                >
                  Save
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

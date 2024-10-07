"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Player } from "@/lib/types";
import { z } from "zod";

type Props = {
  player: Player;
  onSubmit: (data: Player) => void;
};

export const editPlayerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Enter a name"),
  avatar: z.string(),
});

export type EditPlayerSchema = z.infer<typeof editPlayerSchema>;

export function EditPlayerForm({ player, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: EditPlayerSchema) => {
    startTransition(() => {
      return onSubmit(data);
    });
  };

  const form = useForm<EditPlayerSchema>({
    resolver: zodResolver(editPlayerSchema),
    defaultValues: player,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" size="xl">
              Cancel
            </Button>
            <Button type="submit" variant="default" size="xl">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

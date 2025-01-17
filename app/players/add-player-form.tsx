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
import { z } from "zod";

type Props = {
  onSubmit: (data: NewPlayerSchema) => void;
};

export const newPlayerSchema = z.object({
  name: z.string().min(1, "Enter a name"),
});

export type NewPlayerSchema = z.infer<typeof newPlayerSchema>;

export function AddPlayerForm({ onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: NewPlayerSchema) => {
    startTransition(() => {
      return onSubmit(data);
    });
  };

  const form = useForm<NewPlayerSchema>({
    resolver: zodResolver(newPlayerSchema),
    defaultValues: { name: "" },
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
                  <Input placeholder="eg. Doug" autoComplete="off" {...field} />
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
              {isPending ? "Add player..." : "Add player"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

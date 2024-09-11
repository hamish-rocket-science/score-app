import { FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Props = FieldValues & {
  children: React.ReactNode;
  reverse?: boolean;
};

export const ScoreInputField = ({
  name,
  control,
  reverse,
  children,
}: Props) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem
        className={cn("flex gap-8 items-center", reverse && "flex-row-reverse")}
      >
        <FormLabel className="font-semibold">{children}</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="0"
            className="text-3xl w-16 h-16 text-center"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

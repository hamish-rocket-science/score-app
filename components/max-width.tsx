import { cn } from "@/lib/utils";

export const MaxWidth = ({ children }: React.PropsWithChildren) => (
  <div className={cn(" flex flex-col items-center w-full")}>
    <div className="w-full px-4 max-w-4xl">{children}</div>
  </div>
);

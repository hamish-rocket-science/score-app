import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { supabase } from "@/lib/supabase/server";
import { Division } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  seasonId: string;
  divisionId: string;
};

export const DivisionNav = async ({ seasonId, divisionId }: Props) => {
  const { data: divisions } = await supabase
    .from("divisions")
    .select()
    .eq("season_id", seasonId)
    .order("number", { ascending: true })
    .returns<Division[]>();

  if (!divisions) {
    throw new Error("Divisions not found");
  }

  return (
    <div className="border-b w-full">
      <NavigationMenu>
        <NavigationMenuList>
          {divisions.map((division) => {
            const isCurrent = division.id === divisionId;

            return (
              <NavigationMenuItem
                key={division.id}
                className={cn(
                  `border border-b-0 relative rounded-t-lg text-sm`,
                  isCurrent
                    ? "bg-white border-b-white z-10 top-[1px] border-b-[2px]"
                    : "bg-gray-50 border-b-gray-50 z-0 hover:bg-gray-100"
                )}
              >
                <NavigationMenuLink
                  className="p-2 px-4 block"
                  href={`/games/fifa/season/${seasonId}/division/${division.id}`}
                >
                  Division {division.number}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

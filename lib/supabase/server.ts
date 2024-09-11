import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: (url: RequestInfo | URL, options = {}) => {
        return fetch(url, { ...options, cache: "no-store" });
      },
    },
  }
);

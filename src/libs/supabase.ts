import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_BASE_URL!,
  process.env.SUPABASE_KEY!
);

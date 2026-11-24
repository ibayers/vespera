import { createClient } from "@supabase/supabase-js";

// Service-role client: bypass RLS. HANYA untuk server (webhook payment, job admin).
// Jangan pernah di-import dari client component.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

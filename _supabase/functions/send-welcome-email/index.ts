// Arbiter LE — Officer Welcome Email
// Supabase Edge Function
//
// Triggered by a database webhook on INSERT to the officers table.
// Sends a branded "set your password" welcome email (via Resend) to officers
// added AFTER the webhook is created. To reach an already-seeded roster, use the
// one-time batch sender instead: _supabase/scripts/batch-welcome.ts
//
// Auto-injected by Supabase (no manual config needed):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Must be set in Dashboard → Settings → Edge Functions:
//   RESEND_API_KEY   — your Resend API key
//   PLATFORM_URL     — department base URL, e.g. https://egpd.arbiterle.com (no trailing slash)

import { serve }        from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendWelcomeToOfficer, type Officer } from '../_shared/welcome.ts';

const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY    = Deno.env.get('RESEND_API_KEY')!;
const PLATFORM_URL      = Deno.env.get('PLATFORM_URL') ?? 'https://arbiterle.com';

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

serve(async (req) => {
  const payload = await req.json();

  // Supabase database webhooks POST { type, table, record, old_record }
  if (payload.type !== 'INSERT') {
    return new Response('ignored', { status: 200 });
  }

  try {
    const result = await sendWelcomeToOfficer(admin, payload.record as Officer, {
      platformUrl: PLATFORM_URL,
      resendKey:   RESEND_API_KEY,
      dryRun:      false,
    });
    return new Response(result.status, { status: 200 });
  } catch (err) {
    console.error('welcome-email error:', err);
    return new Response(String(err), { status: 500 });
  }
});

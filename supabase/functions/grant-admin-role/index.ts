import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  user_id?: string;
  setup_token?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SETUP_TOKEN = Deno.env.get("ADMIN_SETUP_TOKEN");
    if (!SETUP_TOKEN) {
      return json({ error: "Setup token not configured. Set ADMIN_SETUP_TOKEN secret." }, 500);
    }

    const { user_id, setup_token }: Body = await req.json();

    if (!setup_token || setup_token !== SETUP_TOKEN) {
      return json({ error: "Invalid setup token" }, 401);
    }

    if (!user_id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user_id)) {
      return json({ error: "Invalid user_id (must be a UUID)" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verify the user actually exists in auth
    const { data: userData, error: userErr } = await supabase.auth.admin.getUserById(user_id);
    if (userErr || !userData?.user) {
      return json({ error: "User not found in auth" }, 404);
    }

    const { error: insertErr } = await supabase
      .from("user_roles")
      .insert({ user_id, role: "admin" });

    if (insertErr && !insertErr.message.includes("duplicate")) {
      return json({ error: insertErr.message }, 500);
    }

    return json({ success: true, email: userData.user.email });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

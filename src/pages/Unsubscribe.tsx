import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Status = "loading" | "valid" | "invalid" | "success" | "error" | "already";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-foreground font-['Syne']">
          {status === "success" ? "You're unsubscribed" : "Unsubscribe"}
        </h1>

        {status === "loading" && (
          <p className="text-muted-foreground">Verifying your request…</p>
        )}

        {status === "valid" && (
          <>
            <p className="text-muted-foreground">
              Click below to unsubscribe from future emails.
            </p>
            <button
              onClick={handleUnsubscribe}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Confirm Unsubscribe
            </button>
          </>
        )}

        {status === "success" && (
          <p className="text-muted-foreground">
            You've been successfully unsubscribed. You won't receive any more emails from us.
          </p>
        )}

        {status === "already" && (
          <p className="text-muted-foreground">
            You're already unsubscribed from our emails.
          </p>
        )}

        {status === "invalid" && (
          <p className="text-destructive">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {status === "error" && (
          <p className="text-destructive">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;

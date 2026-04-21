import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

const SetupAdmin = () => {
  const [userId, setUserId] = useState("");
  const [setupToken, setSetupToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grant-admin-role", {
        body: { user_id: userId.trim(), setup_token: setupToken.trim() },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast({
        title: "Admin granted",
        description: `Role applied to ${(data as any)?.email ?? userId}`,
      });
      setUserId("");
      setSetupToken("");
      setTimeout(() => navigate("/auth"), 1500);
    } catch (err) {
      toast({
        title: "Failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <CardTitle className="font-display">Become Admin</CardTitle>
          </div>
          <CardDescription>
            One-time setup. Requires the <code className="text-xs">ADMIN_SETUP_TOKEN</code> secret
            configured in the backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID (UUID)</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="00000000-0000-0000-0000-000000000000"
                required
              />
              <p className="text-xs text-muted-foreground">
                Find it in Backend → Users.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Setup Token</Label>
              <Input
                id="token"
                type="password"
                value={setupToken}
                onChange={(e) => setSetupToken(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Granting…" : "Grant Admin Role"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupAdmin;

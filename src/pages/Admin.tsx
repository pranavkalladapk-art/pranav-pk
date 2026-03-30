import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LogOut, Eye, MousePointerClick, TrendingUp } from "lucide-react";

interface EventRow {
  project_title: string;
  event_type: string;
  link_label: string | null;
  link_url: string | null;
  created_at: string;
}

const CHART_COLORS = [
  "hsl(239, 84%, 67%)",
  "hsl(188, 94%, 53%)",
  "hsl(270, 70%, 60%)",
  "hsl(340, 75%, 55%)",
  "hsl(150, 60%, 50%)",
  "hsl(45, 90%, 55%)",
  "hsl(200, 80%, 55%)",
];

const Admin = () => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchEvents();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("portfolio_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setEvents(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const totalViews = events.filter((e) => e.event_type === "view").length;
  const totalClicks = events.filter((e) => e.event_type === "click").length;

  // Views per project
  const viewsByProject = events
    .filter((e) => e.event_type === "view")
    .reduce<Record<string, number>>((acc, e) => {
      acc[e.project_title] = (acc[e.project_title] || 0) + 1;
      return acc;
    }, {});

  const barData = Object.entries(viewsByProject)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views);

  // Clicks per project for pie chart
  const clicksByProject = events
    .filter((e) => e.event_type === "click")
    .reduce<Record<string, number>>((acc, e) => {
      acc[e.project_title] = (acc[e.project_title] || 0) + 1;
      return acc;
    }, {});

  const pieData = Object.entries(clicksByProject)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Recent events
  const recentEvents = events.slice(0, 20);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold text-foreground">Portfolio Analytics</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{totalViews}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
              <MousePointerClick className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{totalClicks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Views by Project</CardTitle>
            </CardHeader>
            <CardContent>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fill: "hsl(218, 11%, 65%)", fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: "hsl(218, 11%, 65%)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(240, 6%, 9%)", border: "1px solid hsl(0, 0%, 15%)", borderRadius: 8, color: "hsl(210, 20%, 98%)" }} />
                    <Bar dataKey="views" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-12">No view data yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clicks by Project</CardTitle>
            </CardHeader>
            <CardContent>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(240, 6%, 9%)", border: "1px solid hsl(0, 0%, 15%)", borderRadius: 8, color: "hsl(210, 20%, 98%)" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-12">No click data yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent events table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            {recentEvents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 pr-4">Time</th>
                      <th className="text-left py-2 pr-4">Project</th>
                      <th className="text-left py-2 pr-4">Event</th>
                      <th className="text-left py-2">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                          {new Date(event.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4 text-foreground">{event.project_title}</td>
                        <td className="py-2 pr-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                            event.event_type === "view"
                              ? "bg-primary/20 text-primary"
                              : "bg-secondary/20 text-secondary"
                          }`}>
                            {event.event_type === "view" ? <Eye className="w-3 h-3" /> : <MousePointerClick className="w-3 h-3" />}
                            {event.event_type}
                          </span>
                        </td>
                        <td className="py-2 text-muted-foreground truncate max-w-[200px]">
                          {event.link_label || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No events recorded yet. Visit your portfolio to generate some data!</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;

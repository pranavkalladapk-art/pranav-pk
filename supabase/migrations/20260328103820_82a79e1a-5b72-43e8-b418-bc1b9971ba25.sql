
-- Create portfolio analytics events table
CREATE TABLE public.portfolio_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_title TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click')),
  link_label TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (visitors tracking)
CREATE POLICY "Allow anonymous inserts" ON public.portfolio_events
  FOR INSERT TO anon WITH CHECK (true);

-- No select/update/delete for anon - only authenticated users (you) can read
CREATE POLICY "Authenticated users can read events" ON public.portfolio_events
  FOR SELECT TO authenticated USING (true);

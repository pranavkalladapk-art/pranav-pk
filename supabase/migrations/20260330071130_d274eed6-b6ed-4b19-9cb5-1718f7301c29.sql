
-- Add length constraints and format validation to portfolio_events
ALTER TABLE public.portfolio_events
  ADD CONSTRAINT chk_event_type CHECK (event_type IN ('view', 'click')),
  ADD CONSTRAINT chk_project_title_length CHECK (char_length(project_title) <= 200),
  ADD CONSTRAINT chk_link_label_length CHECK (link_label IS NULL OR char_length(link_label) <= 200),
  ADD CONSTRAINT chk_link_url_length CHECK (link_url IS NULL OR char_length(link_url) <= 2000),
  ADD CONSTRAINT chk_link_url_format CHECK (link_url IS NULL OR link_url ~ '^https?://');

-- Replace the overly permissive anon INSERT policy with a validated one
DROP POLICY "Allow anonymous inserts" ON public.portfolio_events;

CREATE POLICY "Allow validated anonymous inserts" ON public.portfolio_events
  FOR INSERT TO anon
  WITH CHECK (
    event_type IN ('view', 'click')
    AND char_length(project_title) <= 200
    AND (link_label IS NULL OR char_length(link_label) <= 200)
    AND (link_url IS NULL OR (char_length(link_url) <= 2000 AND link_url ~ '^https?://'))
  );

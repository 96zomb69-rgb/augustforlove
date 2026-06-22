
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attending TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  guest_names TEXT[] NOT NULL DEFAULT '{}',
  diet TEXT,
  alcohol TEXT[] NOT NULL DEFAULT '{}',
  comment TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvp_responses TO anon;
GRANT INSERT ON public.rsvp_responses TO authenticated;
GRANT ALL ON public.rsvp_responses TO service_role;

ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP" ON public.rsvp_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

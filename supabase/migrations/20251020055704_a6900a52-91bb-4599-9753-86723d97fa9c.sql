-- Enable RLS on lessons table
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read lessons (public content)
CREATE POLICY "Everyone can view lessons"
ON public.lessons
FOR SELECT
USING (true);

-- Only authenticated users can create lessons (teachers)
CREATE POLICY "Authenticated users can create lessons"
ON public.lessons
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update lessons
CREATE POLICY "Authenticated users can update lessons"
ON public.lessons
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete lessons
CREATE POLICY "Authenticated users can delete lessons"
ON public.lessons
FOR DELETE
USING (auth.uid() IS NOT NULL);
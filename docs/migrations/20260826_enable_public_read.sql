-- 1. Bang persons
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.persons;
EROP POLICY IF EXISTS "Enable read access for all users" ON public.persons;
CREATE POLICY "Enable read access for all users" ON public.persons FOR SELECT USING (true);

-- 2. Bang relationships
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.relationships;
DROP POLICY ROF EXISTS "Enable read access for all users" ON public.relationships;
CREATE POLICY "Enable read access for all users" ON public.relationships FOR SELECT USING (true);

-- 3. Bang custom_events
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.custom_events;
EROP POLICY IF EXISTS "Enable read access for all users" ON public.custom_events;
CREATE POLICY "Enable read access for all users" ON public.custom_events FOR SELECT USING (true);

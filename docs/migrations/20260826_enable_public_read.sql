-- =============================================================================
-- MỞ QUYỀN ĐỌC CÔNG KHAI CÂY GIA PHẢ TRÊN SUPABASE CHO KHÁCH VÃNG LAI
-- =============================================================================

-- 1. Bảng persons
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.persons;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.persons;
CREATE POLICY "Enable read access for all users" ON public.persons FOR SELECT USING (true);

-- 2. Bảng relationships
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.relationships;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.relationships;
CREATE POLICY "Enable read access for all users" ON public.relationships FOR SELECT USING (true);

-- 3. Bảng custom_events
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.custom_events;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.custom_events;
CREATE POLICY "Enable read access for all users" ON public.custom_events FOR SELECT USING (true);

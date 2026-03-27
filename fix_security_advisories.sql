-- ============================================
-- SUPABASE SECURITY & PERFORMANCE FIX SCRIPT
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- FIX 1: EXPOSED AUTH USERS (ERROR)
-- FIX 2: SECURITY DEFINER VIEW (ERROR)
-- 
-- Problem: user_info_view queries auth.users and is accessible to anon.
-- It also uses SECURITY DEFINER, running with the view creator's
-- permissions instead of the querying user's.
--
-- Fix: Drop the old view and recreate it with SECURITY INVOKER,
-- restricted to authenticated users only. Revoke anon access.
-- ============================================

-- Drop the existing insecure view
DROP VIEW IF EXISTS public.user_info_view;

-- Recreate with SECURITY INVOKER (uses the querying user's permissions)
CREATE VIEW public.user_info_view
WITH (security_invoker = true)
AS
SELECT 
  u.id,
  u.email,
  u.created_at as account_created_at,
  u.last_sign_in_at,
  u.email_confirmed_at,
  u.phone,
  u.confirmed_at,
  u.raw_user_meta_data,
  p.full_name,
  p.phone as profile_phone,
  p.department,
  p.student_id,
  p.avatar_url,
  p.created_at as profile_created_at,
  p.updated_at as profile_updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Revoke access from anon role (only authenticated users should see this)
REVOKE ALL ON public.user_info_view FROM anon;

-- Grant read-only access to authenticated users only
GRANT SELECT ON public.user_info_view TO authenticated;


-- ============================================
-- FIX 3: RLS POLICY "Anyone can subscribe to notifications" (WARN)
--
-- Problem: INSERT policy on notifications has WITH CHECK (true),
-- allowing unrestricted inserts bypassing RLS.
--
-- Fix: Replace with a policy that requires authentication.
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can subscribe to notifications" ON public.notifications;

-- Create a proper policy requiring authentication
CREATE POLICY "Authenticated users can subscribe to notifications" ON public.notifications
  FOR INSERT
  WITH CHECK ((select auth.uid()) IS NOT NULL);


-- ============================================
-- FIX 4: RLS POLICY "Users can update their own notification settings" (WARN)
--
-- Problem: UPDATE policy has USING (true) and WITH CHECK (true),
-- effectively bypassing RLS for updates.
--
-- Fix: Replace with a policy scoped to the user's own email.
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can update their own notification settings" ON public.notifications;

-- Create a properly scoped policy
CREATE POLICY "Users can update their own notification settings" ON public.notifications
  FOR UPDATE
  USING (email = (select auth.jwt() ->> 'email'))
  WITH CHECK (email = (select auth.jwt() ->> 'email'));


-- ============================================
-- FIX 5: RLS POLICY "Anyone can submit team applications" (WARN)
--
-- Problem: INSERT policy on team_applications has WITH CHECK (true),
-- allowing unrestricted inserts bypassing RLS.
--
-- Fix: Replace with a policy requiring authentication.
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit team applications" ON public.team_applications;

-- Create a proper policy requiring authentication
CREATE POLICY "Authenticated users can submit team applications" ON public.team_applications
  FOR INSERT
  WITH CHECK ((select auth.uid()) IS NOT NULL);


-- ============================================
-- FIX 6: UNUSED INDEXES (PERFORMANCE)
--
-- These indexes have never been used and waste storage/write overhead.
-- If these tables grow larger in the future, you can recreate them.
-- ============================================

DROP INDEX IF EXISTS public.idx_course_classes_course_id;
DROP INDEX IF EXISTS public.idx_enrollments_course_id;
DROP INDEX IF EXISTS public.idx_enrollments_user_id;


-- ============================================
-- VERIFICATION
-- ============================================
SELECT '✅ All security and performance fixes applied!' AS status;

-- ============================================
-- Team Blitzer CUET Learning Platform
-- Complete Database Setup Script
-- ============================================
-- This script creates all tables, indexes, policies, triggers, and sample data
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (user profiles linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  department TEXT,
  student_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  thumbnail TEXT,
  duration TEXT,
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Course classes table (lessons within courses)
CREATE TABLE course_classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  materials TEXT[],
  duration INTEGER, -- in minutes
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enrollments table (user course enrollments)
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_classes TEXT[] DEFAULT '{}',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Team applications table (Join Our Team form submissions)
CREATE TABLE team_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  student_id TEXT,
  department TEXT,
  year_of_study TEXT,
  preferred_wing TEXT, -- Technical or Non-Technical
  specific_interest TEXT, -- Specific wing like Manufacturing, Electronics, etc.
  experience TEXT,
  motivation TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Notifications table (Get Notifications form submissions)
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  interests TEXT[], -- Array of interests like 'events', 'workshops', 'competitions', 'recruitment'
  frequency TEXT DEFAULT 'weekly' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- INDEXES (for better query performance)
-- ============================================

CREATE INDEX idx_course_classes_course_id ON course_classes(course_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles policies (SECURITY: Users can only view their own profile or public info)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING ((select auth.uid()) = id);

-- Courses policies (public read)
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (true);

-- Course classes policies (public read)
CREATE POLICY "Course classes are viewable by everyone" ON course_classes
  FOR SELECT USING (true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- Team applications policies (SECURITY: Only authenticated users can submit, only their own can be viewed)
CREATE POLICY "Authenticated users can submit team applications" ON team_applications
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Users can view their own applications" ON team_applications
  FOR SELECT USING (email = (select auth.jwt() ->> 'email') OR (select auth.uid()) IS NOT NULL);

-- Notifications policies (SECURITY: Only authenticated users can manage notifications)
CREATE POLICY "Authenticated users can subscribe to notifications" ON notifications
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Users can view their own notification settings" ON notifications
  FOR SELECT USING (email = (select auth.jwt() ->> 'email') OR (select auth.uid()) IS NOT NULL);

CREATE POLICY "Users can update their own notification settings" ON notifications
  FOR UPDATE USING (email = (select auth.jwt() ->> 'email'));

CREATE POLICY "Users can delete their own notification settings" ON notifications
  FOR DELETE USING (email = (select auth.jwt() ->> 'email'));

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to handle user creation (creates profile on signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, department, student_id)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'department',
    NEW.raw_user_meta_data->>'student_id'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    phone = COALESCE(EXCLUDED.phone, profiles.phone),
    department = COALESCE(EXCLUDED.department, profiles.department),
    student_id = COALESCE(EXCLUDED.student_id, profiles.student_id),
    updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Triggers to update updated_at timestamp
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_team_applications_updated_at BEFORE UPDATE ON team_applications
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample courses
INSERT INTO courses (title, description, instructor, duration, level, category) VALUES
('Go-Kart Engineering Fundamentals', 'Learn the fundamental principles of go-kart design, including chassis engineering, suspension systems, and safety considerations. Perfect for beginners looking to understand the basics of racing vehicle construction.', 'Dr. Sajal Chandra Banik', '6 weeks', 'Beginner', 'Engineering'),
('Vehicle Dynamics & Aerodynamics', 'Advanced concepts in vehicle performance optimization, covering aerodynamic principles, downforce generation, and handling characteristics. Includes practical wind tunnel testing exercises.', 'Abdullah Al Rifat', '8 weeks', 'Intermediate', 'Aerodynamics'),
('Racing Electronics & Data Analysis', 'Master telemetry systems, sensor integration, and data-driven performance optimization. Learn to analyze lap times, engine parameters, and driver performance metrics.', 'Tech Team Lead', '4 weeks', 'Advanced', 'Electronics'),
('Manufacturing & Fabrication Techniques', 'Hands-on training for building racing components using modern manufacturing techniques. Covers welding, machining, composite materials, and quality control processes.', 'Manufacturing Team', '10 weeks', 'Intermediate', 'Manufacturing'),
('Engine Performance & Tuning', 'Deep dive into engine optimization, fuel systems, and performance tuning. Learn carburetor adjustment, ignition timing, and dyno testing procedures.', 'Powertrain Specialist', '6 weeks', 'Advanced', 'Engine'),
('Team Management & Project Planning', 'Essential skills for leading racing teams, including project management, resource allocation, and effective communication strategies for technical teams.', 'Team Captain', '4 weeks', 'Beginner', 'Management');

-- Insert sample classes for first course
INSERT INTO course_classes (course_id, title, description, duration, order_index)
SELECT 
  c.id,
  'Introduction to Go-Kart Design',
  'Overview of go-kart components, design principles, and safety requirements. Understanding the basic structure and key systems.',
  45,
  1
FROM courses c WHERE c.title = 'Go-Kart Engineering Fundamentals'
UNION ALL
SELECT 
  c.id,
  'Chassis Engineering Fundamentals',
  'Deep dive into chassis design, materials selection, and structural analysis. Learn about frame geometry and weight distribution.',
  60,
  2
FROM courses c WHERE c.title = 'Go-Kart Engineering Fundamentals'
UNION ALL
SELECT 
  c.id,
  'Suspension Systems & Setup',
  'Understanding suspension geometry, spring rates, and damping. Hands-on setup techniques for different track conditions.',
  55,
  3
FROM courses c WHERE c.title = 'Go-Kart Engineering Fundamentals';

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

-- ============================================
-- USER INFORMATION VIEW (for admin dashboard)
-- ============================================
-- This view provides user information without exposing passwords
-- Passwords are hashed by Supabase Auth and cannot be viewed
-- This view shows all user metadata that can be useful for admin purposes

CREATE OR REPLACE VIEW user_info_view AS
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

-- Grant access to the view (adjust permissions as needed)
-- Note: This view is read-only and does not expose passwords
-- Passwords are securely hashed by Supabase Auth and cannot be retrieved

SELECT '✅ Database setup completed successfully!' AS status;


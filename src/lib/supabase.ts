import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'team-blitzer-cuet',
    },
  },
});

// Database Types
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  department: string | null;
  student_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string | null;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  created_at: string;
  updated_at: string;
};

export type CourseClass = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string | null;
  materials: string[] | null;
  duration: number; // in minutes
  order: number;
  created_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  progress: number; // percentage 0-100
  completed_classes: string[]; // array of class IDs
  enrolled_at: string;
  last_accessed: string;
};

export type TeamApplication = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  student_id?: string;
  department?: string;
  year_of_study?: string;
  preferred_wing?: string;
  specific_interest?: string;
  experience?: string;
  motivation?: string;
  portfolio_url?: string;
  resume_url?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type NotificationSubscription = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  interests?: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

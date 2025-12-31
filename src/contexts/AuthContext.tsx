import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, Profile } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: Partial<Profile>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchProfile = async (userId: string, userEmail?: string): Promise<Profile | null> => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Profile fetch error:', error.message);
        console.warn('Error code:', error.code);
        console.warn('Error details:', error.details);
        
        // If profile doesn't exist (PGRST116), create a basic one
        if (error.code === 'PGRST116') {
          console.log('Profile does not exist, creating basic profile...');
          // Try to create a basic profile
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: userEmail || '',
              full_name: null,
              avatar_url: null,
              phone: null,
              department: null,
              student_id: null,
            })
            .select()
            .single();
          
          if (createError) {
            console.warn('Failed to create profile:', createError.message);
            // Return a basic profile object anyway
            return {
              id: userId,
              email: userEmail || '',
              full_name: null,
              avatar_url: null,
              phone: null,
              department: null,
              student_id: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
          }
          
          console.log('Created new profile:', newProfile);
          return newProfile as Profile;
        }
        
        // For other errors, return a basic profile
        return {
          id: userId,
          email: userEmail || '',
          full_name: null,
          avatar_url: null,
          phone: null,
          department: null,
          student_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      console.log('Profile fetched successfully:', data);
      return data;
    } catch (error) {
      console.warn('Profile fetch exception:', error);
      return {
        id: userId,
        email: userEmail || '',
        full_name: null,
        avatar_url: null,
        phone: null,
        department: null,
        student_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  };

  // Refresh profile data
  const refreshProfile = async () => {
    if (user) {
      console.log('Refreshing profile for user:', user.id);
      const profileData = await fetchProfile(user.id, user.email);
      console.log('Refreshed profile data:', profileData);
      console.log('Refreshed profile fields:', {
        full_name: profileData?.full_name,
        phone: profileData?.phone,
        department: profileData?.department,
        student_id: profileData?.student_id,
      });
      if (profileData) {
        setProfile(profileData);
      }
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted) {
        console.warn('Auth loading timeout - setting loading to false');
        setLoading(false);
      }
    }, 5000);

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error.message);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            console.log('Initial auth - fetching profile for user:', session.user.id);
            const profile = await fetchProfile(session.user.id, session.user.email);
            console.log('Initial profile fetched:', profile);
            console.log('Initial profile data:', {
              full_name: profile?.full_name,
              phone: profile?.phone,
              department: profile?.department,
              student_id: profile?.student_id,
            });
            if (mounted && profile) {
              setProfile(profile);
            }
          }
          
          clearTimeout(loadingTimeout);
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          clearTimeout(loadingTimeout);
          setLoading(false);
        }
      }
    };

    // Initialize auth
    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Always fetch fresh profile data when auth state changes
          console.log('Fetching profile on auth state change for user:', session.user.id);
          const profile = await fetchProfile(session.user.id, session.user.email);
          console.log('Fetched profile on auth change:', profile);
          console.log('Profile data received:', {
            full_name: profile?.full_name,
            phone: profile?.phone,
            department: profile?.department,
            student_id: profile?.student_id,
          });
          if (profile) {
            setProfile(profile);
          } else {
            console.warn('No profile returned, but user exists');
          }
        } else {
          // Clear profile when user signs out or session expires
          console.log('No session, clearing profile');
          setProfile(null);
        }
        
        // Handle specific events
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          // These events are handled, but we ensure state is correct
          if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
            setSession(null);
          }
        }
        
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      // Get the current origin for email redirect
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl, // Enable email verification with redirect
          data: {
            full_name: userData?.full_name || null,
            department: userData?.department || null,
            student_id: userData?.student_id || null,
            phone: userData?.phone || null,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error.message);
        return { error };
      }

      // If signup successful and user is created, ensure profile is created with all data
      if (data.user) {
        try {
          console.log('Creating profile with signup data:', userData);
          console.log('User ID:', data.user.id);
          console.log('Email:', email);
          
          // Wait a moment for the trigger to potentially create the profile first
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Use upsert to create/update profile with all signup data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              email: email,
              full_name: userData?.full_name || null,
              phone: userData?.phone || null,
              department: userData?.department || null,
              student_id: userData?.student_id || null,
            }, {
              onConflict: 'id'
            })
            .select()
            .single();

          if (profileError) {
            console.error('Profile upsert error:', profileError);
            console.error('Error details:', profileError.message, profileError.code);
            // If upsert fails, try to fetch the profile that might have been created by trigger
            const fetchedProfile = await fetchProfile(data.user.id, email);
            if (fetchedProfile) {
              console.log('Fetched profile from database after error:', fetchedProfile);
              setProfile(fetchedProfile);
            }
          } else if (profileData) {
            // Profile created successfully, update state immediately
            console.log('Profile created successfully with data:', profileData);
            setProfile(profileData as Profile);
          } else {
            console.warn('No profile data returned, fetching...');
            // Fallback: fetch profile after a short delay
            setTimeout(async () => {
              const fetchedProfile = await fetchProfile(data.user.id, email);
              if (fetchedProfile) {
                console.log('Fetched profile after delay:', fetchedProfile);
                setProfile(fetchedProfile);
              }
            }, 1000);
          }
        } catch (profileErr) {
          console.error('Profile creation exception:', profileErr);
          // Try to fetch profile anyway
          setTimeout(async () => {
            const fetchedProfile = await fetchProfile(data.user.id, email);
            if (fetchedProfile) {
              console.log('Fetched profile after exception:', fetchedProfile);
              setProfile(fetchedProfile);
            }
          }, 1000);
        }
      }

      return { error: null };
    } catch (err) {
      console.error('Signup exception:', err);
      return { error: err as AuthError };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error.message);
        // Check if it's an email verification error
        if (error.message.includes('Email not confirmed') || error.message.includes('email')) {
          return { 
            error: {
              ...error,
              message: 'Please verify your email before signing in. Check your inbox for the confirmation link.'
            } as AuthError
          };
        }
        return { error };
      }

      // If sign in successful, fetch profile
      if (data.user) {
        const profile = await fetchProfile(data.user.id, data.user.email);
        if (profile) {
          setProfile(profile);
        }
      }

      return { error: null };
    } catch (err) {
      console.error('Sign in exception:', err);
      return { error: err as AuthError };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clear all state first
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        // Even if there's an error, we've cleared local state
        return { error };
      }
      
      // Clear any cached data
      console.log('User signed out successfully');
      return { error: null };
    } catch (error) {
      console.error('Sign out exception:', error);
      // Clear state even if there's an exception
      setUser(null);
      setProfile(null);
      setSession(null);
      return { error: error as AuthError };
    }
  };

  // Update profile function (uses upsert to create if doesn't exist)
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      console.error('No user logged in');
      return { error: new Error('No user logged in') };
    }

    try {
      console.log('=== UPDATE PROFILE START ===');
      console.log('Updating profile for user:', user.id);
      console.log('Update data received:', updates);
      console.log('Current profile state before update:', profile);

      // Filter out empty strings and convert to null, but ensure all fields are included
      const cleanUpdates: Partial<Profile> = {
        full_name: updates.full_name === '' ? null : (updates.full_name || null),
        phone: updates.phone === '' ? null : (updates.phone || null),
        department: updates.department === '' ? null : (updates.department || null),
        student_id: updates.student_id === '' ? null : (updates.student_id || null),
      };

      console.log('Clean updates to save:', cleanUpdates);

      // Use upsert - simpler and more reliable
      console.log('Executing upsert operation...');
      console.log('User ID:', user.id);
      console.log('User email:', user.email);
      
      const upsertData = {
        id: user.id,
        email: user.email || '',
        full_name: cleanUpdates.full_name,
        phone: cleanUpdates.phone,
        department: cleanUpdates.department,
        student_id: cleanUpdates.student_id,
      };
      
      console.log('Upsert data:', upsertData);
      console.log('About to call supabase.from("profiles").upsert()...');
      console.log('Timestamp before upsert:', new Date().toISOString());
      
      // Try the upsert operation with better error handling
      let data = null;
      let error = null;
      
      try {
        const startTime = Date.now();
        console.log('Calling supabase upsert...');
        
        const result = await supabase
          .from('profiles')
          .upsert(upsertData, {
            onConflict: 'id',
          })
          .select()
          .single();
        
        const duration = Date.now() - startTime;
        console.log(`Upsert completed in ${duration}ms`);
        
        data = result.data;
        error = result.error;
        
        console.log('Upsert response received');
        console.log('Data:', data);
        console.log('Error:', error);
      } catch (err: any) {
        console.error('Upsert threw an exception:', err);
        error = err;
      }

      if (error) {
        console.error('=== PROFILE UPSERT ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        console.error('Full error object:', error);
        
        // Check if it's an RLS policy issue
        if (error.message.includes('policy') || error.message.includes('permission') || error.message.includes('denied')) {
          console.error('This appears to be an RLS policy issue. Check your database policies.');
        }
        
        throw error;
      }

      if (!data) {
        console.error('No data returned from upsert operation');
        throw new Error('No data returned from save operation');
      }

      console.log('Profile save successful, returned data:', data);
      console.log('Saved profile data:', {
        full_name: data.full_name,
        phone: data.phone,
        department: data.department,
        student_id: data.student_id,
      });

      // Update profile state immediately with the returned data
      console.log('Updating profile state with saved data');
      const updatedProfile = data as Profile;
      setProfile(updatedProfile);
      console.log('Profile state updated:', updatedProfile);

      // Verify the data was actually saved by querying the database
      console.log('Verifying data was saved to database...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (verifyError) {
        console.error('Verification query failed:', verifyError);
      } else {
        console.log('Verification successful - data in database:', {
          full_name: verifyData.full_name,
          phone: verifyData.phone,
          department: verifyData.department,
          student_id: verifyData.student_id,
        });
        // Update state with verified data
        setProfile(verifyData as Profile);
      }
      
      console.log('=== UPDATE PROFILE SUCCESS ===');
      return { error: null };
    } catch (error: any) {
      console.error('=== UPDATE PROFILE FAILED ===');
      console.error('Profile update failed:', error);
      // Return a more user-friendly error message
      const errorMessage = error?.message || 'Failed to update profile. Please try again.';
      return { error: new Error(errorMessage) };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

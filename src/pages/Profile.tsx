import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Hash, Camera, Save, Edit, ArrowLeft, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    department: profile?.department || '',
    student_id: profile?.student_id || '',
  });

  // Refresh profile when component mounts - ensure data is always loaded
  useEffect(() => {
    if (user) {
      // Always refresh profile when component mounts to ensure we have latest data
      console.log('Profile page mounted, refreshing profile for user:', user.id);
      console.log('Current profile state:', profile);
      refreshProfile();
    }
  }, [user?.id]); // Only depend on user ID to avoid unnecessary refreshes

  // Sync form data when profile changes - this ensures saved data is displayed immediately
  useEffect(() => {
    if (profile) {
      console.log('Profile updated in Profile page:', profile);
      console.log('Profile data to display:', {
        full_name: profile.full_name,
        phone: profile.phone,
        department: profile.department,
        student_id: profile.student_id,
      });
      
      // Always update form data when profile changes
      // This ensures saved data is immediately displayed in the form
      const newFormData = {
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        department: profile.department || '',
        student_id: profile.student_id || '',
      };
      
      console.log('Updating form data with profile values:', newFormData);
      setFormData(newFormData);
    } else if (user) {
      // If user exists but no profile, try to fetch it
      console.log('User exists but profile is null, attempting to fetch...');
      refreshProfile();
    } else {
      // If no profile and no user, reset form data
      console.log('No profile and no user, resetting form data');
      setFormData({
        full_name: '',
        phone: '',
        department: '',
        student_id: '',
      });
    }
  }, [profile, user, refreshProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      console.log('=== SAVE PROFILE START ===');
      console.log('Saving profile data:', formData);
      console.log('Current user:', user?.id);
      console.log('Current profile:', profile);
      
      // Add timeout to prevent infinite loading (increased to 30 seconds)
      let timeoutFired = false;
      const saveTimeout = setTimeout(() => {
        timeoutFired = true;
        console.error('Save operation timed out after 30 seconds');
        setMessage({ 
          type: 'error', 
          text: 'Save operation timed out. Please check your connection and try again. If the problem persists, check the browser console for details.' 
        });
        setLoading(false);
      }, 30000); // 30 second timeout
      
      console.log('Calling updateProfile...');
      console.log('Form data being sent:', formData);
      console.log('User ID:', user?.id);
      console.log('User email:', user?.email);
      
      // Check if we have a valid session
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session ? 'Exists' : 'None');
      if (!session) {
        setMessage({ 
          type: 'error', 
          text: 'No active session. Please log in again.' 
        });
        setLoading(false);
        clearTimeout(saveTimeout);
        return;
      }
      
      const { error } = await updateProfile(formData);
      
      clearTimeout(saveTimeout);
      
      // If timeout already fired, don't process the result
      if (timeoutFired) {
        console.warn('Timeout fired, ignoring result');
        return;
      }
      
      console.log('updateProfile completed, error:', error);
      
      if (error) {
        console.error('Profile update error:', error);
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to update profile. Please check the browser console for details.' 
        });
        setLoading(false);
      } else {
        console.log('Profile updated successfully!');
        setMessage({ type: 'success', text: 'Profile updated successfully! Your changes have been saved permanently.' });
        setEditing(false);
        setLoading(false);
        
        // Force a refresh of the profile to ensure we have the latest data
        // This ensures data persists after page refresh and is displayed immediately
        setTimeout(async () => {
          console.log('Refreshing profile after save...');
          await refreshProfile();
          // The useEffect will automatically update formData when profile changes
        }, 300);
      }
    } catch (error: any) {
      console.error('Profile update exception:', error);
      setMessage({ 
        type: 'error', 
        text: error?.message || 'An unexpected error occurred. Please check the browser console.' 
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      department: profile?.department || '',
      student_id: profile?.student_id || '',
    });
    setEditing(false);
    setMessage(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information and preferences
          </p>
        </div>
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {profile?.full_name 
                    ? getInitials(profile.full_name) 
                    : (user?.email?.split('@')[0]?.charAt(0).toUpperCase() || 'U')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-medium text-foreground text-lg">
                {profile?.full_name || user?.email?.split('@')[0] || 'No name set'}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {user?.email}
              </p>
              {profile?.department && (
                <p className="text-xs text-muted-foreground mb-1">
                  {profile.department} {profile.student_id && `• ID: ${profile.student_id}`}
                </p>
              )}
              {!profile?.full_name && (
                <p className="text-xs text-primary/80 mb-2 italic">
                  Complete your profile below to see your name here
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            {!editing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="pl-10 bg-muted"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email address cannot be changed
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Your full name"
                value={formData.full_name}
                onChange={handleInputChange}
                disabled={!editing}
                className="pl-10"
              />
            </div>
          </div>

          {/* Student ID and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student_id">Student ID</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="student_id"
                  name="student_id"
                  type="text"
                  placeholder="22xxxxx"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="ME, EEE, CSE..."
                  value={formData.department}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editing}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Account Created</Label>
              <p className="text-sm text-muted-foreground">
                {profile?.created_at 
                  ? new Date(profile.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : user?.created_at
                  ? new Date(user.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'N/A'
                }
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Last Updated</Label>
              <p className="text-sm text-muted-foreground">
                {profile?.updated_at 
                  ? new Date(profile.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : profile?.created_at
                  ? new Date(profile.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, GraduationCap, Hash, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode, onSuccess }) => {
  const { signIn, signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    department: '',
    student_id: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [signupEmail, setSignupEmail] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          // Filter out rate limiting messages - they're not user-friendly
          if (error.message.includes('security purposes') || error.message.includes('request this after')) {
            setError('Please wait a moment before trying again.');
          } else if (error.message.includes('Email not confirmed') || error.message.includes('verify your email')) {
            setError('Please verify your email before signing in. Check your inbox for the confirmation link.');
          } else {
            setError(error.message);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          onSuccess?.();
        }
      } else {
        // Add timeout to prevent infinite loading
        const signupTimeout = setTimeout(() => {
          setIsLoading(false);
          setError('Signup is taking longer than expected. Please try again.');
        }, 15000); // 15 second timeout
        
        try {
          const { error } = await signUp(formData.email, formData.password, {
            full_name: formData.full_name || null,
            phone: formData.phone || null,
            department: formData.department || null,
            student_id: formData.student_id || null,
          });
          
          clearTimeout(signupTimeout);
          
          if (error) {
            // Filter out rate limiting messages - they're not user-friendly
            if (error.message.includes('security purposes') || error.message.includes('request this after')) {
              setError('Please wait a moment before trying again.');
            } else {
              setError(error.message);
            }
            setIsLoading(false);
          } else {
            // Signup successful - show success dialog and switch to login
            setError(null);
            setSignupEmail(formData.email);
            setShowSuccessDialog(true);
            
            // Clear form data
            setFormData({
              email: formData.email, // Keep email for login
              password: '',
              confirmPassword: '',
              full_name: '',
              phone: '',
              department: '',
              student_id: '',
            });
            
            // Switch to login mode after a short delay
            setTimeout(() => {
              onToggleMode();
            }, 100);
            
            setIsLoading(false);
          }
        } catch (signupErr) {
          clearTimeout(signupTimeout);
          setError('An unexpected error occurred during signup');
          console.error('Signup error:', signupErr);
          setIsLoading(false);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {mode === 'login' ? 'Welcome Back' : 'Join Team Blitzer'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {mode === 'login' 
                  ? 'Sign in to access your dashboard' 
                  : 'Create your account to get started'
                }
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@cuet.ac.bd"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Signup Additional Fields */}
              {mode === 'signup' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="full_name"
                        name="full_name"
                        type="text"
                        placeholder="Your Full Name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

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
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || loading}
              >
                {isLoading || loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-primary hover:underline font-medium"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Account Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              We've sent a confirmation email to <strong>{signupEmail}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Please check your email inbox and click the confirmation link to verify your account before signing in.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-medium text-foreground">Next Steps:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the confirmation link in the email</li>
                <li>Return here to sign in with your email and password</li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> You must verify your email before you can sign in. If you don't see the email, check your spam folder.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
              }}
              className="w-full"
            >
              Got it! Sign In Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

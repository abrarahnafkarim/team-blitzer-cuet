import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { user, loading, session } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchParams] = useSearchParams();
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

  // Check if user just verified their email
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'signup' || searchParams.get('token')) {
      setShowVerificationSuccess(true);
      // Clear the URL parameters
      window.history.replaceState({}, '', '/auth');
      // Hide message after 5 seconds
      setTimeout(() => setShowVerificationSuccess(false), 5000);
    }
  }, [searchParams]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  // Check both user and session to be extra sure
  if (user && session) {
    return <Navigate to="/dashboard" replace />;
  }

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  return (
    <div>
      {showVerificationSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Email verified successfully! You can now sign in.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <AuthForm 
        mode={authMode} 
        onToggleMode={toggleAuthMode}
        onSuccess={() => {
          // Redirect will happen automatically via Navigate component above
        }}
      />
    </div>
  );
};

export default Auth;

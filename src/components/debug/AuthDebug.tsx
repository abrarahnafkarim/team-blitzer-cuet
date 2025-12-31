import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const AuthDebug: React.FC = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Environment Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {supabaseUrl ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Supabase URL: Connected</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Supabase URL: Missing</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {supabaseKey ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Supabase Key: Connected</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Supabase Key: Missing</span>
            </>
          )}
        </div>

        {(!supabaseUrl || !supabaseKey) && (
          <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Environment Variables Missing</p>
              <p className="text-xs text-muted-foreground">
                Create a .env.local file in the project root with your Supabase credentials
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

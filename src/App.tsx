import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SidebarDemo } from "@/components/demo";
import TetrisLoading from "@/components/ui/tetris-loader";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Team = lazy(() => import("./pages/Team"));
const Articles = lazy(() => import("./pages/Articles"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback — Motorsport Tetris preloader
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <TetrisLoading size="sm" speed="fast" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/team" element={<Team />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sidebar-demo" element={<SidebarDemo />} />
            
            {/* Protected Dashboard Routes - All require authentication */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              {/* Add any other dashboard routes here - they'll all be protected */}
            </Route>

            {/* Catch-all route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </Suspense>
        </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

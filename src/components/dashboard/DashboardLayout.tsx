import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  User,
  LogOut,
  Home,
  Menu,
  X,
  Settings,
  Bell,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Home', href: '/', icon: Home, external: true },
  { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export const DashboardLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Sign out error:', error);
        // Still navigate even if there's an error
      }
      // Navigate to home page after sign out
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign out exception:', error);
      // Navigate anyway
      navigate('/', { replace: true });
    }
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
    <ThemeProvider>
      <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="flex">
        <motion.div
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : '-100%',
          }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-card via-card to-card/95 backdrop-blur-xl border-r border-border/50 lg:relative lg:translate-x-0 lg:block shadow-xl"
        >
          <div className="flex h-full flex-col">
            {/* Enhanced Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="relative">
                  <img 
                    src="/blitzer_logo.jpg" 
                    alt="Team Blitzer CUET" 
                    className="h-9 w-9 rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg"></div>
                </div>
                <div>
                  <span className="font-heading font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                    Blitzer Learn
                  </span>
                  <p className="text-xs text-muted-foreground leading-none">
                    Learning Platform
                  </p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Enhanced Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href && !item.external;
                
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-primary/5 transition-all duration-200 group"
                    >
                      <div className="p-1 rounded-md group-hover:bg-primary/10 transition-colors">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span>{item.name}</span>
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-primary/5'
                    }`}
                  >
                    <div className={`p-1 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'group-hover:bg-primary/10'
                    }`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Enhanced User section */}
            <div className="p-4 border-t border-border/50 bg-gradient-to-r from-muted/20 to-transparent">
              <div className="bg-gradient-to-br from-card to-muted/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {profile?.full_name ? getInitials(profile.full_name) : user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">
                      {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {profile?.department ? `${profile.department} Student` : 'Team Member'}
                    </p>
                    {profile?.student_id && (
                      <p className="text-xs text-primary/80 truncate font-medium">
                        ID: {profile.student_id}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-2 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Enhanced Top bar */}
          <header className="h-16 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-primary/10"
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Team Blitzer Learning
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Racing Engineering Education Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all"
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover:bg-primary/10">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-primary/10 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                        {profile?.full_name ? getInitials(profile.full_name) : user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 p-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {profile?.full_name ? getInitials(profile.full_name) : user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1 flex-1">
                        <p className="text-sm font-semibold leading-none">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        {profile?.department && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {profile.department}
                            </span>
                            {profile.student_id && (
                              <span className="text-xs text-muted-foreground">
                                ID: {profile.student_id}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      <BookOpen className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="w-full cursor-pointer">
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Settings className="mr-3 h-4 w-4" />
                    <span>Settings</span>
                    <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Enhanced Page content */}
          <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/10 min-h-[calc(100vh-4rem)]">
            <div className="max-w-6xl w-full mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

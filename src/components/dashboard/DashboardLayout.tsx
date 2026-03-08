import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/', icon: <Home className="h-5 w-5 flex-shrink-0" />, external: true },
  { name: 'Dashboard', href: '/dashboard', icon: <BookOpen className="h-5 w-5 flex-shrink-0" /> },
  { name: 'Profile', href: '/dashboard/profile', icon: <User className="h-5 w-5 flex-shrink-0" /> },
];

export const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="/blitzer_logo.jpg"
        alt="Team Blitzer CUET"
        className="h-6 w-6 rounded-lg shadow-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre font-heading text-lg bg-gradient-primary bg-clip-text text-transparent"
      >
        Blitzer Learn
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="/blitzer_logo.jpg"
        alt="Team Blitzer CUET"
        className="h-6 w-6 rounded-lg shadow-sm flex-shrink-0"
      />
    </Link>
  );
};

export const DashboardLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign out exception:', error);
      navigate('/', { replace: true });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ThemeProvider>
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 overflow-hidden relative",
          "h-screen" // Full screen height
        )}
      >
        <div className="z-50 shrink-0">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {navigation.map((link, idx) => (
                    <SidebarLink
                      key={idx}
                      link={{
                        label: link.name,
                        href: link.href,
                        icon: link.icon,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 group/sidebar py-2 px-1">
                  <Avatar className="h-7 w-7 flex-shrink-0 border border-primary/20">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {profile?.full_name
                        ? getInitials(profile.full_name)
                        : user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className="flex flex-col whitespace-pre transition duration-150 overflow-hidden"
                  >
                    <span className="text-sm font-medium text-foreground truncate max-w-[150px]">
                      {profile?.full_name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {profile?.department && `${profile.department}`}
                    </span>
                  </motion.div>
                </div>
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden bg-background relative z-10 w-full">
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4">
               {/* Mobile menu trigger is handled inside the SidebarBody component automatically */}
               <div className="hidden md:flex items-center gap-3">
                 <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                   Blitzer Dashboard
                 </h1>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-background border-border"
                />
              </div>

              <ThemeToggle />

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {profile?.full_name
                          ? getInitials(profile.full_name)
                          : user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/10 h-full w-full">
            <div className="max-w-6xl w-full mx-auto animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};


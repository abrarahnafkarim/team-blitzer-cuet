import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight, User, LogIn, Users, Calendar, Trophy, Image, Clock, Handshake, GraduationCap, Info, Home, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home, isRoute: true },
  { label: "Team", href: "/team", icon: Users, isRoute: true },
  { label: "Article", href: "/articles", icon: FileText, isRoute: true },
  { label: "About", href: "#about", icon: Info, isRoute: false },
  { label: "Advisors", href: "#advisors", icon: GraduationCap, isRoute: false },
  { label: "Events", href: "#events", icon: Calendar, isRoute: false },
  { label: "Achievements", href: "#achievements", icon: Trophy, isRoute: false },
  { label: "Gallery", href: "#gallery", icon: Image, isRoute: false },
  { label: "Timeline", href: "#timeline", icon: Clock, isRoute: false },
  { label: "Sponsors", href: "#sponsors", icon: Handshake, isRoute: false },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Start minimized by default
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const { user, loading } = useAuth();

  // Update main content margin when sidebar is minimized (desktop only)
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent && window.innerWidth >= 1024) {
      mainContent.style.marginLeft = isMinimized ? '80px' : '280px';
    } else if (mainContent) {
      mainContent.style.marginLeft = '0';
    }
    
    // Handle window resize
    const handleResize = () => {
      if (mainContent) {
        if (window.innerWidth >= 1024) {
          mainContent.style.marginLeft = isMinimized ? '80px' : '280px';
        } else {
          mainContent.style.marginLeft = '0';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMinimized]);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Track active section based on scroll position (only for hash sections)
  useEffect(() => {
    const handleScroll = () => {
      // Only track hash-based navigation items (not routes)
      const hashItems = NAV_ITEMS.filter(item => !item.isRoute);
      const sections = hashItems.map(item => ({
        id: item.href.replace('#', ''),
        href: item.href
      }));
      
      // Get viewport middle for better detection
      const scrollPosition = window.scrollY + (window.innerHeight / 3);

      // Check each section to see which one is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if the scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setActiveSection(sections[i].href);
            return;
          }
        }
      }
      
      // If at top of page, no section is active
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    // Only track scroll on home page
    if (location.pathname === '/') {
      handleScroll(); // Initial check
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  // Handle hash navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update active section immediately
        setActiveSection(href);
      }
      // Close mobile sidebar after navigation
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Refresh the page and go to the beginning
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Menu Button - Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[100] lg:hidden bg-background border border-border rounded-md p-2.5 hover:bg-accent transition-colors shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </button>

      {/* Desktop Minimize/Expand Button */}
      <button
        onClick={toggleMinimize}
        className="hidden lg:flex fixed top-4 z-[100] bg-background/80 backdrop-blur-sm border border-border rounded-lg p-2 hover:bg-accent transition-colors shadow-lg transition-all duration-300"
        style={{ left: isMinimized ? "88px" : "288px" }}
        aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
      >
        {isMinimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        style={{
          width: isMinimized ? "80px" : "280px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r border-border z-[95] transition-transform duration-300 ease-in-out shadow-lg",
          "lg:!transform-none"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Home Button */}
          <a
            href="/"
            onClick={handleHomeClick}
            className={cn(
              "flex items-center gap-3 p-6 border-b border-border transition-all hover:bg-accent cursor-pointer",
              isMinimized && "justify-center px-2"
            )}
            title="Home - Scroll to top"
          >
            <img 
              src="/blitzer_logo.jpg" 
              alt="Team Blitzer CUET logo" 
              className="h-10 w-10 rounded-lg flex-shrink-0" 
            />
            {!isMinimized && (
              <span className="font-heading text-lg font-semibold whitespace-nowrap text-foreground">
                Team Blitzer CUET
              </span>
            )}
          </a>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.isRoute 
                ? location.pathname === item.href 
                : activeSection === item.href;
              
              return item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative",
                    "hover:bg-accent text-foreground",
                    isMinimized && "justify-center px-2",
                    isActive && "bg-primary/10 border-l-4 border-primary font-semibold"
                  )}
                  title={isMinimized ? item.label : undefined}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-primary" : "text-foreground"
                  )} />
                  {!isMinimized && (
                    <span className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {item.label}
                    </span>
                  )}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative",
                    "hover:bg-accent text-foreground",
                    isMinimized && "justify-center px-2",
                    isActive && "bg-primary/10 border-l-4 border-primary font-semibold"
                  )}
                  title={isMinimized ? item.label : undefined}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-primary" : "text-foreground"
                  )} />
                  {!isMinimized && (
                    <span className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      isActive ? "text-primary" : "text-foreground"
                    )}>
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className={cn(
            "p-4 border-t border-border space-y-3",
            isMinimized && "px-2"
          )}>
            {!loading && (
              <>
                {user ? (
                  <Link to="/dashboard" className={cn("block", isMinimized && "flex justify-center")}>
                    <Button 
                      className={cn(
                        "w-full gap-2 bg-primary hover:bg-primary/90 text-white",
                        isMinimized && "w-auto px-3"
                      )}
                      title={isMinimized ? "Dashboard" : undefined}
                    >
                      <User className="h-4 w-4 flex-shrink-0" />
                      {!isMinimized && <span>Dashboard</span>}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth" className={cn("block", isMinimized && "flex justify-center")}>
                    <Button 
                      className={cn(
                        "w-full gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
                        isMinimized && "w-auto px-3"
                      )}
                      title={isMinimized ? "Login" : undefined}
                    >
                      <LogIn className="h-4 w-4 flex-shrink-0" />
                      {!isMinimized && <span>Login</span>}
                    </Button>
                  </Link>
                )}
              </>
            )}
            <div className={cn(
              "flex items-center justify-between",
              isMinimized && "justify-center"
            )}>
              {!isMinimized && (
                <span className="text-sm text-muted-foreground">Theme</span>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>

    </>
  );
};


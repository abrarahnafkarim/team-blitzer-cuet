import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, Users, Calendar, Trophy, Image, Clock, Handshake, GraduationCap, Info, Home, FileText } from "lucide-react";
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

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 280;

export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const { user, loading } = useAuth();

  const isExpanded = hovered;

  // Update main content margin when sidebar expands/collapses (desktop only)
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent && window.innerWidth >= 1024) {
      mainContent.style.marginLeft = `${COLLAPSED_WIDTH}px`;
      mainContent.style.transition = "margin-left 0.3s ease";
    } else if (mainContent) {
      mainContent.style.marginLeft = "0";
    }

    const handleResize = () => {
      if (mainContent) {
        if (window.innerWidth >= 1024) {
          mainContent.style.marginLeft = `${COLLAPSED_WIDTH}px`;
        } else {
          mainContent.style.marginLeft = "0";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const hashItems = NAV_ITEMS.filter((item) => !item.isRoute);
      const sections = hashItems.map((item) => ({
        id: item.href.replace("#", ""),
        href: item.href,
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setActiveSection(sections[i].href);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    if (location.pathname === "/") {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(href);
      }
      if (window.innerWidth < 1024) {
        setMobileOpen(false);
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/";
  };

  // Shared nav items renderer
  const renderNavItems = (minimized: boolean) =>
    NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      const isActive = item.isRoute
        ? location.pathname === item.href
        : activeSection === item.href;

      const commonClass = cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group",
        "hover:bg-accent text-foreground",
        minimized && "justify-center",
        isActive && "bg-primary/10 font-semibold"
      );

      const iconClass = cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-foreground/80");

      const label = (
        <AnimatePresence>
          {!minimized && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className={cn("text-sm font-medium whitespace-nowrap", isActive ? "text-primary" : "text-foreground")}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      );

      return item.isRoute ? (
        <Link
          key={item.href}
          to={item.href}
          className={commonClass}
          title={minimized ? item.label : undefined}
          onClick={() => { if (window.innerWidth < 1024) setMobileOpen(false); }}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
          )}
          <Icon className={iconClass} />
          {label}
        </Link>
      ) : (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={commonClass}
          title={minimized ? item.label : undefined}
        >
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
          )}
          <Icon className={iconClass} />
          {label}
        </a>
      );
    });

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-[100] lg:hidden bg-background border border-border rounded-md p-2.5 hover:bg-accent transition-colors shadow-md"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (always full width when open) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full bg-background border-r border-border z-[95] shadow-xl lg:hidden"
            style={{ width: EXPANDED_WIDTH }}
          >
            <div className="flex flex-col h-full">
              <a
                href="/"
                onClick={handleHomeClick}
                className="flex items-center gap-3 p-5 border-b border-border hover:bg-accent cursor-pointer"
              >
                <img src="/blitzer_logo.jpg" alt="Team Blitzer CUET" className="h-9 w-9 rounded-lg flex-shrink-0" />
                <span className="font-heading text-base font-semibold whitespace-nowrap text-foreground">Team Blitzer CUET</span>
              </a>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">{renderNavItems(false)}</nav>
              <div className="p-4 border-t border-border space-y-3">
                {!loading && (
                  user ? (
                    <Link to="/dashboard">
                      <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white">
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white font-medium">
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </Button>
                    </Link>
                  )
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar — hover to expand */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex fixed top-0 left-0 h-full flex-col bg-background border-r border-border z-[95] shadow-lg overflow-hidden"
      >
        {/* Logo */}
        <a
          href="/"
          onClick={handleHomeClick}
          className={cn(
            "flex items-center gap-3 border-b border-border hover:bg-accent cursor-pointer transition-all",
            isExpanded ? "p-5" : "p-4 justify-center"
          )}
          title={isExpanded ? undefined : "Home"}
        >
          <img src="/blitzer_logo.jpg" alt="Team Blitzer CUET" className="h-9 w-9 rounded-lg flex-shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-heading text-base font-semibold whitespace-nowrap text-foreground"
              >
                Team Blitzer CUET
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {renderNavItems(!isExpanded)}
        </nav>

        {/* Auth + Theme */}
        <div className={cn("p-3 border-t border-border space-y-3", !isExpanded && "flex flex-col items-center")}>
          {!loading && (
            isExpanded ? (
              user ? (
                <Link to="/dashboard">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white font-medium">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )
            ) : (
              <Link to={user ? "/dashboard" : "/auth"} title={user ? "Dashboard" : "Login"}>
                <Button className="w-auto px-3 bg-primary hover:bg-primary/90 text-white" size="sm">
                  {user ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                </Button>
              </Link>
            )
          )}
          <div className={cn("flex items-center", isExpanded ? "justify-between" : "justify-center")}>
            {isExpanded && <span className="text-sm text-muted-foreground">Theme</span>}
            <ThemeToggle />
          </div>
        </div>
      </motion.aside>
    </>
  );
};

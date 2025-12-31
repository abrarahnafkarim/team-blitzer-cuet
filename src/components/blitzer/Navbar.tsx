import { Link } from "react-router-dom";
// Use logo from public folder
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { label: "Advisors", href: "#advisors" },
  { label: "Team Structure", href: "#team-structure" },
  { label: "Events", href: "#events" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsors", href: "#sponsors" },
];

export const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-surface">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/blitzer_logo.jpg" alt="Team Blitzer CUET logo" className="h-9 w-9" />
              <span className="font-heading text-lg">Team Blitzer CUET</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="story-link text-sm">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <Link to="/dashboard">
                    <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-white">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-white font-medium">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

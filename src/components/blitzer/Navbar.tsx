import { Link } from "react-router-dom";
// Use logo from public folder
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_ITEMS = [
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Timeline", href: "#timeline" },
  { label: "Stories", href: "#stories" },
  { label: "Sponsors", href: "#sponsors" },
];

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-surface">
        <nav className="container mx-auto flex items-center justify-between py-3">
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
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

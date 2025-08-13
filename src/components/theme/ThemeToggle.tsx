import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
    >
      {isDark ? <Moon className="h-4 w-4" aria-hidden /> : <Sun className="h-4 w-4" aria-hidden />}
      <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

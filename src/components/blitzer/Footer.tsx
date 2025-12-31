import { Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-accent">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-heading text-lg mb-2">Team Blitzer CUET</h3>
          <p className="text-sm text-muted-foreground">Go-kart & Formula racing team from CUET.</p>
          <p className="text-sm mt-2">Contact: <a href="mailto:team@blitzer.cuet" className="story-link">team@blitzer.cuet</a></p>
        </div>
        <nav aria-label="Footer navigation" className="flex items-center gap-6">
          <a href="#achievements" className="text-sm story-link">Achievements</a>
          <a href="#gallery" className="text-sm story-link">Gallery</a>
          <a href="#stories" className="text-sm story-link">Stories</a>
          <a href="#sponsors" className="text-sm story-link">Sponsors</a>
        </nav>
        <div className="flex items-center gap-4 justify-start md:justify-end">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Team Blitzer CUET. All rights reserved.
        <br />
        This website is developed by <a href="https://www.linkedin.com/in/abrar-ahnaf-karim-bangladesh/" target="_blank" rel="noreferrer" className="story-link">Abrar Ahnaf Karim</a>
      </div>
    </footer>
  );
};

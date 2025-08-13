import React from "react";
import heroImage from "@/assets/hero-race-purple.jpg";
import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";

export const Hero: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState({ transform: "translateY(0px) scale(1)" });

  React.useEffect(() => {
    const ticking = { current: false } as { current: boolean };

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, 1 - rect.top / viewportH));
      const translate = -progress * 30; // px
      const scale = 1 + progress * 0.05;
      setStyle({ transform: `translateY(${translate}px) scale(${scale})` });
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{ backgroundImage: `url(${heroImage})`, ...style, objectFit: 'cover', objectPosition: 'center' }}
        aria-hidden
      />
      <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} aria-hidden />
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center animate-enter"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          {(["Team", "Blitzer"] as const).map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-2"
              initial={{ y: "1em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.06 * i, duration: 0.5, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            className="inline-block"
            initial={{ y: "1em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            CUET
          </motion.span>
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Go-kart & Formula racing team — engineering speed with precision and passion.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2 max-w-md mx-auto">
          <div className="rounded-md border border-border glass-surface p-2 text-center flex flex-col items-center min-w-0">
            <h3 className="text-xs text-muted-foreground mb-1">Champion</h3>
            <div className="text-lg md:text-xl font-semibold">0</div>
          </div>
          <div className="rounded-md border border-border glass-surface p-2 text-center flex flex-col items-center min-w-0">
            <h3 className="text-xs text-muted-foreground mb-1">Top Speed (km/h)</h3>
            <div className="text-lg md:text-xl font-semibold">50</div>
          </div>
          <div className="rounded-md border border-border glass-surface p-2 text-center flex flex-col items-center min-w-0">
            <h3 className="text-xs text-muted-foreground mb-1">Safety Record</h3>
            <div className="text-lg md:text-xl font-semibold">100%</div>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center" aria-hidden>
        <div className="h-10 w-6 rounded-full border border-border flex items-start justify-center p-1 opacity-80">
          <div className="h-2 w-1 rounded bg-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};

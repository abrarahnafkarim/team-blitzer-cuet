import React from "react";
import heroImage from "@/assets/hero-race-purple.jpg";
import { motion } from "framer-motion";
import { useOptimizedScroll, useThrottle } from "@/hooks/usePerformanceOptimization";

export const Hero: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState({ transform: "translateY(0px) scale(1)" });

  const updateParallax = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || 1;
    const progress = Math.min(1, Math.max(0, 1 - rect.top / viewportH));
    const translate = -progress * 30; // px
    const scale = 1 + progress * 0.05;
    setStyle({ transform: `translateY(${translate}px) scale(${scale})` });
  }, []);

  useOptimizedScroll(updateParallax, 16);

  React.useEffect(() => {
    updateParallax();
  }, [updateParallax]);

  const onMouseMove = useThrottle((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  }, 16);

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
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4" style={{ transform: 'translateY(-5px)' }}>
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
      </motion.div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center" aria-hidden>
        <div className="h-10 w-6 rounded-full border border-border flex items-start justify-center p-1 opacity-80">
          <div className="h-2 w-1 rounded bg-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};

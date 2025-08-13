import React from "react";
import { motion } from "framer-motion";
import { about } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

export const About: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [desc, setDesc] = React.useState<string>(about.description);
  const [showWatermark, setShowWatermark] = React.useState(true);

  React.useEffect(() => {
    fetch('/about.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.description) setDesc(d.description as string);
      })
      .catch(() => {});
  }, []);

  // Intersection Observer to play/pause video based on section visibility
  React.useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    video.muted = true;
    video.volume = 0;
    video.autoplay = true;
    video.loop = true;
    let observer: IntersectionObserver | null = null;
    const handlePlayPause = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    observer = new window.IntersectionObserver(handlePlayPause, {
      threshold: 0.5,
    });
    observer.observe(section);
    return () => {
      if (observer && section) observer.unobserve(section);
    };
  }, []);

  // Handle click to unmute and remove watermark
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      setShowWatermark(false);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
        <motion.article
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="h-1.5 w-16 bg-gradient-primary rounded-full" aria-hidden />
          <SplitText text={about.title} as="h2" className="font-heading text-3xl md:text-4xl font-semibold tracking-tight" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {desc}
          </p>
          <p className="text-lg md:text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Premium engineering. Purpose-built performance.
          </p>
        </motion.article>

        <motion.div
          className="relative rounded-xl overflow-hidden border border-border"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="aspect-video w-full bg-muted">
            <video
              ref={videoRef}
              src="/about-video.mp4"
              className="h-full w-full object-cover cursor-pointer"
              preload="auto"
              playsInline
              loop
              controls={false}
              muted
              autoPlay
              aria-label="Team Blitzer CUET promo video"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={handleVideoClick}
            />
            {showWatermark && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.10)' }}
              >
                <span
                  className="bg-white/80 rounded-full shadow flex items-center justify-center select-none"
                  style={{ width: 48, height: 48, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {/* Simple mute volume SVG icon */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                    <path d="M9 9v6h4l5 5V4l-5 5H9z" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="red" strokeWidth="2" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

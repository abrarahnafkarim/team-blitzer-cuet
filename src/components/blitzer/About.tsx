import React from "react";
import { motion } from "framer-motion";
import { about } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

export const About: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [desc, setDesc] = React.useState<string>(about.description);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showMuteIcon, setShowMuteIcon] = React.useState(true);

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
    video.volume = 1.0;
    video.loop = true;
    
    let observer: IntersectionObserver | null = null;
    const handlePlayPause = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        video.pause();
        setIsPlaying(false);
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

  // Track play/pause state
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle mute icon click - unmute and hide icon
  const handleMuteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = false;
    video.volume = 1.0;
    setShowMuteIcon(false);
  };

  // Handle play/pause toggle (only after mute icon is hidden)
  const togglePlayPause = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    
    // If mute icon is still showing, do nothing
    if (showMuteIcon) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  // Handle keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (showMuteIcon) {
        const video = videoRef.current;
        if (video) {
          video.muted = false;
          video.volume = 1.0;
          setShowMuteIcon(false);
        }
      } else {
        togglePlayPause(e);
      }
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
          <div 
            className="aspect-video w-full bg-muted relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary" 
            onClick={togglePlayPause}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <video
              ref={videoRef}
              src={about.videoUrl}
              className="h-full w-full object-cover"
              preload="auto"
              playsInline
              loop
              controls={false}
              muted
              aria-label="Team Blitzer CUET promo video"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Mute Icon - Shows initially, disappears after click */}
            {showMuteIcon && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300"
              >
                <button
                  onClick={handleMuteClick}
                  className="bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                  style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Click to unmute"
                >
                  {/* Mute icon */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="white" />
                    <line x1="23" y1="9" x2="17" y2="15" stroke="red" strokeWidth="3" />
                    <line x1="17" y1="9" x2="23" y2="15" stroke="red" strokeWidth="3" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Play/Pause Button - Only visible when paused AND mute icon is hidden */}
            {!showMuteIcon && !isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300"
              >
                <button
                  onClick={(e) => togglePlayPause(e)}
                  className="bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                  style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Play video"
                >
                  {/* Play icon */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

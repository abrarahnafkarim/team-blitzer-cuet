import React from "react";
import { motion } from "framer-motion";
import { about } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

export const About: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [desc, setDesc] = React.useState<string>(about.description);

  React.useEffect(() => {
    fetch('/about.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.description) setDesc(d.description as string);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {
      // If autoplay with sound is blocked, play after user interaction
      const tryPlay = () => {
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(() => {});
        window.removeEventListener('click', tryPlay);
        window.removeEventListener('touchstart', tryPlay);
      };
      window.addEventListener('click', tryPlay);
      window.addEventListener('touchstart', tryPlay);
    });
  }, []);

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
              className="h-full w-full object-cover"
              preload="auto"
              playsInline
              loop
              controls={false}
              muted={false}
              autoPlay
              aria-label="Team Blitzer CUET promo video"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

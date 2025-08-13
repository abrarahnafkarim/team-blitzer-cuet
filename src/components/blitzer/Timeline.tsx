import React from "react";
import { timeline as data, TimelineItem as TItem } from "@/data/siteData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";

const useInView = (options?: IntersectionObserverInit) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2, ...options }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView } as const;
};

const TimelineCard: React.FC<{ item: TItem; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInView();
  const side = index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10";
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="mt-2 ml-3 h-3 w-3 rounded-full bg-primary shadow" aria-hidden />
        <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
          <div
            ref={ref}
            className={`${side} transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-primary">{item.year}</span>
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline = () => {
  return (
    <section id="timeline" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="Timeline" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Milestones along our journey</p>
        </header>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />
          <div className="space-y-8">
            {data.map((t, idx) => (
              <TimelineCard key={t.id} item={t} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { gallery as items } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SplitText } from "@/components/motion/SplitText";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Gallery = () => {
  const [filter, setFilter] = React.useState<string>("All");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<typeof items[number] | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const tags = React.useMemo(() => {
    const uniques = Array.from(new Set(items.map((i) => i.tag)));
    return ["All", ...uniques];
  }, []);

  const data = React.useMemo(() => {
    return filter === "All" ? items : items.filter((i) => i.tag === filter);
  }, [filter]);

  // Reset index when filter changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const onOpen = React.useCallback((item: typeof items[number]) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [data.length]);

  return (
    <section id="gallery" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-6 text-center">
          <SplitText text="Gallery" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Moments from the track and the workshop</p>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {tags.map((t) => (
            <Button
              key={t}
              variant={t === filter ? "premium" : "secondary"}
              size="sm"
              onClick={() => setFilter(t)}
              aria-pressed={t === filter}
              aria-label={`Filter by ${t}`}
            >
              {t}
            </Button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {data.length > 0 && (
            <>
              {/* Main Image */}
              <figure 
                className="group overflow-hidden rounded-lg border border-border shadow-lg cursor-pointer bg-muted"
                onClick={() => onOpen(data[currentIndex])}
              >
                <div className="aspect-video w-full flex items-center justify-center bg-muted">
                  <img
                    src={data[currentIndex].src}
                    alt={data[currentIndex].alt}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4 text-center bg-background border-t border-border">
                  <span className="text-sm font-medium">{data[currentIndex].alt}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({currentIndex + 1} / {data.length})
                  </span>
                </figcaption>
              </figure>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                aria-label="Previous image"
                disabled={data.length <= 1}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                aria-label="Next image"
                disabled={data.length <= 1}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-200",
                      index === currentIndex 
                        ? "w-8 bg-primary" 
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          {selected && (
            <img src={selected.src} alt={selected.alt} className="w-full h-auto object-contain" loading="eager" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};


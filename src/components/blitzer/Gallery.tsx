import React from "react";
import { gallery as items } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SplitText } from "@/components/motion/SplitText";

export const Gallery = () => {
  const [filter, setFilter] = React.useState<string>("All");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<typeof items[number] | null>(null);

  const tags = React.useMemo(() => {
    const uniques = Array.from(new Set(items.map((i) => i.tag)));
    return ["All", ...uniques];
  }, []);

  const data = React.useMemo(() => {
    return filter === "All" ? items : items.filter((i) => i.tag === filter);
  }, [filter]);

  const onOpen = (item: typeof items[number]) => {
    setSelected(item);
    setOpen(true);
  };

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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {data.map((img) => (
            <figure key={img.id} className="group mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border shadow-sm hover-scale cursor-pointer" onClick={() => onOpen(img)}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="sr-only">{img.alt}</figcaption>
            </figure>
          ))}
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


import { sponsors } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

export const Sponsors = () => {
  return (
    <section id="sponsors" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="Sponsors" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Partners powering our pursuit of speed</p>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sponsors.map((sp) => (
            sp.url ? (
              <a
                key={sp.id}
                href={sp.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${sp.name} website`}
                className="flex items-center justify-center rounded-md border border-border bg-card p-4 shadow-sm hover-scale focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <span className="font-medium text-sm md:text-base text-foreground">{sp.name}</span>
              </a>
            ) : (
              <div key={sp.id} className="flex items-center justify-center rounded-md border border-border bg-card p-4 shadow-sm hover-scale">
                <span className="font-medium text-sm md:text-base text-foreground">{sp.name}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

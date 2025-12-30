import { sponsors } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

export const Sponsors = () => {
  return (
    <section id="sponsors" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <SplitText text="Sponsors" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Partners powering our pursuit of speed</p>
        </header>
        <div className="flex justify-center">
          <div className="max-w-2xl">
            {sponsors.map((sp) => (
              <div key={sp.id} className="flex justify-center mb-8">
                {sp.url ? (
                  <a
                    href={sp.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${sp.name} website`}
                    className="block rounded-lg border border-border bg-card p-8 shadow-lg hover-scale focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300"
                  >
                    {sp.image ? (
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={sp.image}
                          alt={sp.name}
                          className="max-w-full h-auto max-h-32 object-contain"
                          loading="lazy"
                        />
                        <span className="text-sm text-muted-foreground text-center">
                          {sp.name}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-lg text-foreground text-center block">
                        {sp.name}
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="rounded-lg border border-border bg-card p-8 shadow-lg hover-scale transition-all duration-300">
                    {sp.image ? (
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={sp.image}
                          alt={sp.name}
                          className="max-w-full h-auto max-h-32 object-contain"
                          loading="lazy"
                        />
                        <span className="text-sm text-muted-foreground text-center">
                          {sp.name}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-lg text-foreground text-center block">
                        {sp.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

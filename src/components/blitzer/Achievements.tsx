import { achievements } from "@/data/siteData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/motion/SplitText";

export const Achievements = () => {
  return (
    <section id="achievements" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="Achievements" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Highlights from races and competitions</p>
        </header>
        <Carousel className="relative">
          <CarouselContent>
            {achievements.map((a) => (
              <CarouselItem key={a.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="hover-scale h-full">
                  <figure className="aspect-[16/9] overflow-hidden">
                    <img
                      src={a.image}
                      alt={`${a.event} ${a.year}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{a.event}</span>
                      <span className="text-primary font-semibold">{a.position}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-1">{a.year}</p>
                    <p className="text-sm">{a.description}</p>
                    {a.url && (
                      <a href={a.url} className="inline-block mt-3">
                        <Button variant="secondary" size="sm" aria-label={`View details for ${a.event}`}>View</Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

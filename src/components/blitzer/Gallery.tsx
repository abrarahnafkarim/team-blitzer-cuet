import React from "react";
import { gallery as items } from "@/data/siteData";
import {
  GridBody,
  DraggableContainer,
  GridItem,
} from "@/components/ui/infinite-drag-scroll";
import { SplitText } from "@/components/motion/SplitText";

export const Gallery = () => {
  return (
    <section id="gallery" className="scroll-mt-24 py-16 md:py-24">
      {/* Header */}
      <div className="container mx-auto px-4 mb-6 text-center">
        <SplitText
          text="Gallery"
          as="h2"
          className="font-heading text-3xl md:text-4xl font-semibold"
        />
        <p className="text-muted-foreground mt-2">
          Drag to explore · Moments from the track and the workshop
        </p>
      </div>

      {/* Infinite Drag-Scroll Grid */}
      <DraggableContainer variant="masonry">
        <GridBody>
          {items.map((image) => (
            <GridItem
              key={image.id}
              className="relative h-54 w-36 md:h-96 md:w-64"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="pointer-events-none absolute h-full w-full object-cover"
                loading="lazy"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                <span className="text-white text-xs font-medium drop-shadow-md">
                  {image.alt}
                </span>
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </section>
  );
};

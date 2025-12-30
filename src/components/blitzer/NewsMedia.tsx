import React from "react";
import { SplitText } from "@/components/motion/SplitText";

export const NewsMedia: React.FC = () => {
  return (
    <section id="news" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="In the News" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">External coverage and media mentions</p>
        </header>
        {/* News content removed - section kept empty as requested */}
      </div>
    </section>
  );
};

export default NewsMedia;


import React from "react";
import { SplitText } from "@/components/motion/SplitText";

export const Events: React.FC = () => {
  return (
    <section id="events" className="scroll-mt-24 py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <SplitText 
            text="Events" 
            as="h2" 
            className="font-heading text-3xl md:text-4xl font-semibold mb-4" 
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our exciting events, workshops, and competitions. Stay updated with the latest happenings 
            in Team Blitzer CUET and participate in our journey of racing excellence.
          </p>
        </header>
        
        {/* Events content removed - section kept empty as requested */}
      </div>
    </section>
  );
};

export default Events;

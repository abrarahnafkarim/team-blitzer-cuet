import React from "react";
import { motion } from "framer-motion";
import { advisors } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const AdvisorCard: React.FC<{ advisor: typeof advisors[number]; index: number }> = ({ advisor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <Card className="overflow-hidden hover-scale">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-accent/30 rounded-lg p-4 mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {advisor.name}
                </h3>
                <p className="text-primary font-semibold mb-1">
                  {advisor.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {advisor.department}
                </p>
              </div>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                {advisor.description}
              </p>
              
              {/* Contact Info */}
              {advisor.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a 
                    href={`mailto:${advisor.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {advisor.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const Advisors: React.FC = () => {
  return (
    <section id="advisors" className="scroll-mt-24 py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <SplitText 
            text="Honourable Advisors" 
            as="h2" 
            className="font-heading text-3xl md:text-4xl font-semibold mb-4" 
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Distinguished faculty members who guide our engineering excellence and innovation in racing technology.
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          {advisors.map((advisor, index) => (
            <AdvisorCard 
              key={advisor.id} 
              advisor={advisor} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advisors;

import React from "react";
import { motion } from "framer-motion";
import { teamStructure, TeamCategory } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ChevronRight } from "lucide-react";

const TeamCategoryCard: React.FC<{ category: TeamCategory; index: number }> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {String.fromCharCode(65 + index)}. {category.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-2">
            {category.wings.map((wing, wingIndex) => (
              <AccordionItem 
                key={wing.id} 
                value={wing.id}
                className="border border-border rounded-lg px-4 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center gap-2 flex-1 text-left">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{wing.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {wing.members.length} members
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pt-2 pl-6">
                    {wing.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {wing.description}
                      </p>
                    )}
                    
                    {wing.members.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team Members
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {wing.members.map((member, memberIndex) => (
                            <Badge 
                              key={memberIndex} 
                              variant="outline" 
                              className="text-xs"
                            >
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-border rounded-lg">
                        <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Team members will be added soon
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const TeamStructure: React.FC = () => {
  return (
    <section id="team-structure" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <SplitText 
            text="Team Structure" 
            as="h2" 
            className="font-heading text-3xl md:text-4xl font-semibold mb-4" 
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our organized team structure ensures efficient collaboration across technical and non-technical domains,
            driving innovation and excellence in every aspect of our racing endeavors.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {teamStructure.map((category, index) => (
            <TeamCategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamStructure;

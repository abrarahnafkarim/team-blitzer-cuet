import { stories } from "@/data/siteData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";

export const Stories = () => {
  return (
    <section id="stories" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="Stories" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">Build notes and race weekend insights</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{s.summary}</p>
                  <Link to={`/stories/${s.slug}`} className="inline-block">
                    <Button variant="premium" size="sm">Read Story</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { news } from "@/data/siteData";
import { SplitText } from "@/components/motion/SplitText";

type NewsItem = (typeof news)[number];

const extractOG = (html: string) => {
  const get = (property: string) => {
    const re = new RegExp(`<meta[^>]+property="${property}"[^>]+content="([^"]+)"[^>]*>`, "i");
    const m = html.match(re);
    return m?.[1];
  };
  return {
    title: get("og:title") || undefined,
    image: get("og:image") || undefined,
  } as { title?: string; image?: string };
};

const NewsCard: React.FC<{ item: NewsItem; idx: number }> = ({ item, idx }) => {
  const [meta, setMeta] = React.useState<{ title?: string; image?: string }>({});

  React.useEffect(() => {
    let alive = true;
    fetch(item.url, { method: "GET" })
      .then((r) => r.text())
      .then((html) => {
        if (!alive) return;
        const og = extractOG(html);
        setMeta(og);
      })
      .catch(() => {
        // CORS or fetch error: gracefully fallback
      });
    return () => {
      alive = false;
    };
  }, [item.url]);

  const hostname = (() => {
    try {
      return new URL(item.url).hostname.replace(/^www\./, "");
    } catch {
      return item.url;
    }
  })();

  const title = meta.title || item.title;
  const image = meta.image || item.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 * idx }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open news: ${title}`}
        className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Card className="hover-scale h-full">
          <figure className="aspect-[16/9] overflow-hidden">
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </figure>
          <CardHeader>
            <CardTitle className="text-base md:text-lg leading-snug story-link">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{hostname}</p>
          </CardContent>
        </Card>
      </a>
    </motion.article>
  );
};

export const NewsMedia: React.FC = () => {
  return (
    <section id="news" className="scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <SplitText text="In the News" as="h2" className="font-heading text-3xl md:text-4xl font-semibold" />
          <p className="text-muted-foreground mt-2">External coverage and media mentions</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <NewsCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsMedia;


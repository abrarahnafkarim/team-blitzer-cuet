import { useParams, Link } from "react-router-dom";
import { stories } from "@/data/siteData";
import { Helmet } from "react-helmet-async";

const StoryDetail = () => {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading mb-2">Story not found</h1>
          <Link to="/" className="story-link">Back to home</Link>
        </div>
      </div>
    );
  }

  const title = `${story.title} — Team Blitzer CUET`;
  const description = story.summary;

  return (
    <main className="container mx-auto px-4 py-16">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <article className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">{story.title}</h1>
          <p className="text-sm text-muted-foreground">{new Date(story.date).toLocaleDateString()}</p>
        </header>
        <section className="text-base leading-relaxed space-y-4">
          <p>{story.content}</p>
        </section>
      </article>
    </main>
  );
};

export default StoryDetail;

import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/blitzer/Sidebar";
import { Footer } from "@/components/blitzer/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const Articles = () => {
  const title = "Articles — Team Blitzer CUET";
  const description = "Read articles and stories from Team Blitzer CUET.";

  return (
    <ThemeProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col transition-all duration-300" id="main-content">
          <main className="flex-1 pt-20">
            <div className="container mx-auto px-4 py-16">
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Articles
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Articles and stories coming soon...
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Articles;


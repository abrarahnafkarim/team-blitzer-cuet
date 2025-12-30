import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/blitzer/Navbar";
import { Hero } from "@/components/blitzer/Hero";
import { About } from "@/components/blitzer/About";
import { Advisors } from "@/components/blitzer/Advisors";
import { TeamStructure } from "@/components/blitzer/TeamStructure";
import { Achievements } from "@/components/blitzer/Achievements";
import { Gallery } from "@/components/blitzer/Gallery";
import { Timeline } from "@/components/blitzer/Timeline";
import { Stories } from "@/components/blitzer/Stories";
import { Sponsors } from "@/components/blitzer/Sponsors";
import { Footer } from "@/components/blitzer/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { NewsMedia } from "@/components/blitzer/NewsMedia";

const Index = () => {
  const title = "Team Blitzer CUET — Premium Racing Team";
  const description = "Go-kart & Formula racing team from CUET. Explore achievements, gallery, timeline, stories, and sponsors.";

  return (
    <ThemeProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Advisors />
          <TeamStructure />
          <Achievements />
          <Gallery />
          <Timeline />
          <Stories />
          <NewsMedia />
          <Sponsors />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

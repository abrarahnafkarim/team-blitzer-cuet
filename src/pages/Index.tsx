import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/blitzer/Sidebar";
import { Hero } from "@/components/blitzer/Hero";
import { About } from "@/components/blitzer/About";
import { Advisors } from "@/components/blitzer/Advisors";
import { Events } from "@/components/blitzer/Events";
import { Achievements } from "@/components/blitzer/Achievements";
import { Gallery } from "@/components/blitzer/Gallery";
import { Timeline } from "@/components/blitzer/Timeline";
import { Sponsors } from "@/components/blitzer/Sponsors";
import { Footer } from "@/components/blitzer/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
        <Sidebar />
        <div className="flex-1 flex flex-col transition-all duration-300" id="main-content">
          <main className="flex-1">
            <Hero />
            <About />
            <Advisors />
            <Events />
            <Achievements />
            <Gallery />
            <Timeline />
            <Sponsors />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;

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
import React from "react";

// Memoize below-fold sections to prevent re-renders
const MemoAdvisors = React.memo(Advisors);
const MemoEvents = React.memo(Events);
const MemoAchievements = React.memo(Achievements);
const MemoGallery = React.memo(Gallery);
const MemoTimeline = React.memo(Timeline);
const MemoSponsors = React.memo(Sponsors);
const MemoFooter = React.memo(Footer);

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
            <div className="content-defer">
              <MemoAdvisors />
            </div>
            <div className="content-defer">
              <MemoEvents />
            </div>
            <div className="content-defer">
              <MemoAchievements />
            </div>
            <div className="content-defer">
              <MemoGallery />
            </div>
            <div className="content-defer">
              <MemoTimeline />
            </div>
            <div className="content-defer">
              <MemoSponsors />
            </div>
          </main>
          <MemoFooter />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;

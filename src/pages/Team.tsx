import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/blitzer/Sidebar";
import { TeamStructure } from "@/components/blitzer/TeamStructure";
import { Footer } from "@/components/blitzer/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const Team = () => {
  const title = "Team Structure — Team Blitzer CUET";
  const description = "Explore the organizational structure of Team Blitzer CUET, including technical and non-technical teams.";

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
            <TeamStructure />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Team;


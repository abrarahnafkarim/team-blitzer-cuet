import heroImage from "@/assets/hero-race-purple.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

export const siteInfo = {
  name: "Team Blitzer CUET",
  tagline: "Engineering speed with precision and passion",
  heroImage,
};

export const about = {
  title: "About Team Blitzer CUET",
  description:
    "Team Blitzer CUET is CUET's student-led racing team competing in go-kart and formula events. We blend engineering rigor with track-tested innovation across chassis, powertrain, aero, and telemetry to push performance and mentorship on and off the circuit.",
  // Use the Vercel-hosted video
  videoUrl: "https://teamblitzer.vercel.app/about-video.mp4",
};
export type Achievement = {
  id: string;
  year: number;
  event: string;
  position: string;
  description: string;
  image: string;
  url?: string;
};

export const achievements: Achievement[] = [
  { id: "a1", year: 2024, event: "National Kart Challenge", position: "1st", description: "Dominant performance with best lap delta.", image: g1, url: "/stories/building-the-2024-kart" },
  { id: "a2", year: 2023, event: "Formula Student Local", position: "2nd", description: "Precision chassis and aero setup.", image: g2 },
  { id: "a3", year: 2022, event: "Campus GP", position: "Champion", description: "Clean sweep across all heats.", image: g3, url: "/stories/race-weekend-strategy" },
  { id: "a4", year: 2021, event: "Innovation Award", position: "Winner", description: "Lightweight composite innovations.", image: g1 },
];

export type GalleryItem = { id: string; src: string; alt: string; tag: "Track" | "Build" | "Team" };
export const gallery: GalleryItem[] = [
  { id: "g1", src: g1, alt: "Go-kart cornering with purple accent lighting", tag: "Track" },
  { id: "g2", src: g2, alt: "Racing wheel and brake assembly macro", tag: "Build" },
  { id: "g3", src: g3, alt: "Pit lane scene with team working on kart", tag: "Team" },
];

export type TimelineItem = { id: string; year: number; title: string; description: string };
export const timeline: TimelineItem[] = [
  { id: "t1", year: 2020, title: "Team Formation", description: "Blitzer CUET was founded by a group of passionate engineers." },
  { id: "t2", year: 2021, title: "First Podium", description: "Secured our first podium finish in campus GP." },
  { id: "t3", year: 2023, title: "New Powertrain", description: "Introduced upgraded powertrain and telemetry stack." },
  { id: "t4", year: 2024, title: "National Championship", description: "Claimed the national kart challenge title." },
];

export type Story = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
};

export const stories: Story[] = [
  {
    id: "s1",
    slug: "building-the-2024-kart",
    title: "Building the 2024 Kart",
    summary: "From CAD to track: our iterative design and testing journey.",
    content: "Detailed write-up of our 2024 build including chassis, aero, and telemetry.",
    date: "2024-06-12",
  },
  {
    id: "s2",
    slug: "race-weekend-strategy",
    title: "Race Weekend Strategy",
    summary: "How we approach practice, quali, and race pace management.",
    content: "Strategy notes covering tyres, fuel, driver stints, and pit discipline.",
    date: "2024-04-02",
  },
];

export type Sponsor = { id: string; name: string; url?: string };
export const sponsors: Sponsor[] = [
  { id: "sp1", name: "PurpleTech" },
  { id: "sp2", name: "Velocity Labs" },
  { id: "sp3", name: "AeroForge" },
  { id: "sp4", name: "TorqueWorks" },
  { id: "sp5", name: "Cuet Alumni Assoc" },
];

export type NewsItem = { id: string; url: string; title: string; image: string };
export const news: NewsItem[] = [
  {
    id: "n1",
    url: "https://www.bbc.com/sport/motorsport",
    title: "University racing teams push innovation on and off track",
    image: g1,
  },
  {
    id: "n2",
    url: "https://www.autosport.com/",
    title: "Student-built karts showcase cutting-edge engineering",
    image: g2,
  },
  {
    id: "n3",
    url: "https://www.formula1.com/",
    title: "Grassroots teams shaping the future of motorsport",
    image: g3,
  },
];

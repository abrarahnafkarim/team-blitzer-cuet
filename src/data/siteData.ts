import heroImage from "@/assets/hero-race-purple.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import p11 from "@/assets/p11.jpg";
import p12 from "@/assets/p12.jpg";
import p13 from "@/assets/p13.jpg";
import p14 from "@/assets/p14.jpg";
import p15 from "@/assets/p15.jpg";
import p16 from "@/assets/p16.jpg";

export const siteInfo = {
  name: "Team Blitzer CUET",
  tagline: "Engineering speed with precision and passion",
  heroImage,
};

export const about = {
  title: "About Team Blitzer CUET",
  description:
    "Team Blitzer CUET is CUET's student led racing team competing in go-kart and formula events. We blend engineering rigor with track tested innovation across chassis, powertrain, aero, and telemetry to push performance and mentorship on and off the circuit.",
  // Use the locally hosted video in the public folder
  videoUrl: "/about-video.mp4",
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
  { id: "a1", year: 2024, event: "IUT Automech 2025 TurboCAD", position: "Champion", description: "𝐀𝐬𝐡𝐚𝐛 𝐁𝐢𝐧 𝐅𝐚𝐫𝐮𝐤, 𝐌𝐃. 𝐌𝐞𝐡𝐞𝐝𝐢 𝐇𝐚𝐬𝐚𝐧, 𝐌𝐮𝐡𝐭𝐚𝐬𝐢𝐦𝐮𝐥 𝐁𝐚𝐫𝐢 𝟏𝐬𝐭 𝐩𝐥𝐚𝐜𝐞 in TurboCAD with precision design skills made it possible", image: g1, url: "https://www.facebook.com/photo?fbid=122105632430966266&set=pcb.122105506190966266" },
  { id: "a2", year: 2023, event: "IUT Automech 2025 Engine Blueprint", position: "3rd", description: "𝐒𝐌 𝐀𝐧𝐢𝐬𝐮𝐥 𝐀𝐬𝐞𝐤𝐢𝐧 𝐎𝐧𝐢𝐜𝐞,𝐌𝐚𝐡𝐞𝐫𝐚𝐛 𝐇𝐨𝐬𝐬𝐚𝐢𝐧 𝐊𝐡𝐚𝐧,𝐌𝐃. 𝐑𝐚𝐬𝐡𝐢𝐝𝐮𝐥 𝐑𝐚𝐡𝐦𝐚𝐧 𝐒𝐚𝐥𝐦𝐚𝐧,𝐀𝐬𝐡𝐚𝐛 𝐁𝐢𝐧 𝐅𝐚𝐫𝐮𝐤 nailing the tough engine assembly challenge under pressure", image: g2, url: "https://www.facebook.com/photo?fbid=122105632472966266&set=pcb.122105506190966266" },
  { id: "a3", year: 2022, event: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", position: "Champion", description: "𝐀𝐬𝐡𝐚𝐛 𝐁𝐢𝐧 𝐅𝐚𝐫𝐮𝐤 𝐚𝐧𝐝 𝐌𝐞𝐡𝐞𝐝𝐢 𝐇𝐚𝐬𝐚𝐧 𝐞𝐦𝐞𝐫𝐠𝐞𝐝 𝐚𝐬 𝐜𝐡𝐚𝐦𝐩𝐢𝐨𝐧𝐬 𝐢𝐧 𝐃𝐞𝐬𝐢𝐠𝐧𝐗, 𝐞𝐱𝐭𝐞𝐧𝐝𝐢𝐧𝐠 𝐨𝐮𝐫 𝐰𝐢𝐧𝐧𝐢𝐧𝐠 𝐫𝐮𝐧!", image: g3, url: "https://www.facebook.com/share/p/1Y63pg3GjG/" },
  { id: "a4", year: 2021, event: "Innovation Award", position: "Winner", description: "Lightweight composite innovations.", image: g1 },
];

export type GalleryItem = { id: string; src: string; alt: string; tag: "Track" | "Build" | "Team" };
export const gallery: GalleryItem[] = [
  { id: "p1", src: p1, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
  { id: "p2", src: p2, alt: "IUT Automech 2025 Engine Blueprint", tag: "Team" },
  { id: "p3", src: p3, alt: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", tag: "Team" },
  { id: "p4", src: p4, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
  { id: "p5", src: p5, alt: "IUT Automech 2025 Engine Blueprint", tag: "Team" },
  { id: "p6", src: p6, alt: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", tag: "Team" },
  { id: "p7", src: p7, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
  { id: "p8", src: p8, alt: "IUT Automech 2025 Engine Blueprint", tag: "Team" },
  { id: "p9", src: p9, alt: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", tag: "Team" },
  { id: "p10", src: p10, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
  { id: "p11", src: p11, alt: "IUT Automech 2025 Engine Blueprint", tag: "Team" },
  { id: "p12", src: p12, alt: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", tag: "Team" },
  { id: "p13", src: p13, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
  { id: "p14", src: p14, alt: "IUT Automech 2025 Engine Blueprint", tag: "Team" },
  { id: "p15", src: p15, alt: "𝐈𝐂𝐌𝐄𝐑𝐄 𝟐𝟎𝟐𝟓, 𝐂𝐔𝐄𝐓", tag: "Team" },
  { id: "p16", src: p16, alt: "IUT Automech 2025 TurboCAD", tag: "Team" },
];

export type TimelineItem = { id: string; year: number; title: string; description: string };
export const timeline: TimelineItem[] = [
  { id: "t1", year: 2025, title: "Team Formation", description: "Blitzer CUET was founded by a group of passionate engineers in 2025 ." },
  { id: "t2", year: 2025, title: "Go-Kart Build", description: "Completed the go-kart build and started testing." },
  { id: "t3", year: 2025, title: "Recruitment", description: "Recruited new members and started training." },
  { id: "t4", year: 2026, title: "", description: "." },
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

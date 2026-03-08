import React from "react";
import { TimelineUI } from "@/components/ui/timeline";
import { SplitText } from "@/components/motion/SplitText";

// Timeline images
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
import p18 from "@/assets/p18.jpg";
import p19 from "@/assets/p19.jpg";
import p20 from "@/assets/p20.jpg";
import p21 from "@/assets/p21.jpg";

const imageShadow =
  "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";

const timelineEntries = [
  {
    title: "July 2025",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-2">
          <span className="font-semibold text-base md:text-lg text-foreground">
            Team Formation
          </span>
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-6">
          Blitzer CUET was founded by a group of passionate engineers in July 2025.
        </p>
        <div className="mb-8 space-y-1">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🏎️ Founded by passionate engineers at CUET
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🔧 Assembled a multi-disciplinary team
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            📋 Established technical and non-technical wings
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🎯 Set mission: compete in national go-kart & formula events
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[p4, p5, p16, p3].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Team Formation - ${i + 1}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Aug–Oct 2025",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-2">
          <span className="font-semibold text-base md:text-lg text-foreground">
            Go-Kart Building
          </span>
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-6">
          Completed the go-kart build and started testing over three months of intensive work.
        </p>
        <div className="mb-8 space-y-1">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ⚙️ Completed chassis design and fabrication
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🔩 Engine assembly and powertrain integration
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🏁 First successful test drive on track
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            📐 Iterated on aerodynamics and suspension
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[p1, p6, p7, p8].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Go-Kart Build - ${i + 1}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[p14, p15].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Go-Kart Build - ${i + 5}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Nov 2025",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-2">
          <span className="font-semibold text-base md:text-lg text-foreground">
            Workshop
          </span>
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-6">
          Conducted workshop sessions for hands-on training and skill development.
        </p>
        <div className="mb-8 space-y-1">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🔧 Hands-on mechanical training sessions
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🎓 Knowledge sharing across all wings
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ⚙️ Engine disassembly and reassembly practice
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🤝 Team bonding and skill development
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[p2, p9, p10, p11].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Workshop - ${i + 1}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Dec 2025",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-2">
          <span className="font-semibold text-base md:text-lg text-foreground">
            Recruitment of 23 Batch
          </span>
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-6">
          Recruited new members from the 23 batch and started training.
        </p>
        <div className="mb-8 space-y-1">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            📢 Launched campus-wide recruitment campaign
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            👥 Onboarded new members from 23 batch
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🎓 Orientation and training for freshers
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            🤝 Mentorship program with senior members
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[p12, p13, p18, p19].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`23 Batch Recruitment - ${i + 1}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[p20, p21].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`23 Batch Recruitment - ${i + 5}`}
              className={`rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full ${imageShadow}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    ),
  },
];

export const Timeline = () => {
  return (
    <section id="timeline" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-8">
        <SplitText
          text="Timeline"
          as="h2"
          className="font-heading text-3xl md:text-4xl font-semibold"
        />
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-sm">
          Milestones along our journey — from formation to the finish line
        </p>
      </div>
      <TimelineUI data={timelineEntries} />
    </section>
  );
};

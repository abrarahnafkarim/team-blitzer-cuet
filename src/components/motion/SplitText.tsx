import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, as = "h2", className = "", stagger = 0.04 }) => {
  const words = React.useMemo(() => text.split(/\s+/), [text]);
  const Tag = as as any;

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
            },
          },
        }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-2"
            variants={{ hidden: { y: "1em", opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;

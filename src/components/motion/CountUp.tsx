import React from "react";

interface CountUpProps {
  end: number;
  duration?: number; // in ms
  decimals?: number;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1200,
  decimals = 0,
  suffix = "",
  className = "",
}) => {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let start = 0;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          start = performance.now();
          const step = (ts: number) => {
            const progress = Math.min(1, (ts - start) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = end * eased;
            setValue(current);
            if (progress < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, end, started]);

  const formatted = React.useMemo(() => {
    return `${value.toFixed(decimals)}${suffix}`;
  }, [value, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
};

export default CountUp;

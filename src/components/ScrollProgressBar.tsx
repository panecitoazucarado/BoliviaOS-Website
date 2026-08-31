import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const percentage = Math.min(Math.max((currentScroll / totalScroll) * 100, 0), 100);
      setScrollPercentage(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${scrollPercentage}%`,
          background: "var(--gradient-brand)",
          boxShadow: "0 0 10px rgba(46, 184, 92, 0.5), 0 0 5px rgba(230, 0, 0, 0.4)",
        }}
      />
    </div>
  );
}

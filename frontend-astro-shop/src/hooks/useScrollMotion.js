import { useEffect, useRef } from "react";

export default function useScrollMotion() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.setProperty(
          "--progress",
          entry.intersectionRatio
        );
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

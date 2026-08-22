"use client";

import { useEffect, useRef, useState } from "react";

export default function useVisibilityObserver(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let rafId;
    let settled = false;

    const checkVisibility = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.top < vh && rect.bottom > 0;

      if (visible) {
        setIsVisible(true);
        settled = true;
      }
    };

    // Poll via rAF for the first ~1.5s after mount (covers main's fadeIn
    // animation and any image-driven layout shifts in the gallery),
    // since IntersectionObserver's initial callback is unreliable on
    // some mobile Safari versions until a scroll/resize event happens.
    const start = performance.now();
    const poll = (now) => {
      if (settled) return;
      checkVisibility();
      if (!settled && now - start < 1500) {
        rafId = requestAnimationFrame(poll);
      }
    };
    rafId = requestAnimationFrame(poll);

    // Normal observer for anything below the fold that needs a real
    // scroll to trigger.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          settled = true;
        }
      },
      { threshold },
    );
    observer.observe(node);

    return () => {
      cancelAnimationFrame(rafId);
      observer.unobserve(node);
    };
  }, [threshold]);

  return [ref, isVisible];
}

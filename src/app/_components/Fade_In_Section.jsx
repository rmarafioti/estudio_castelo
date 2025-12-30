"use client";

import useVisibilityObserver from "../_hooks/useVisibility";

export default function FadeInSection({ children, className = "" }) {
  const [ref, isVisible] = useVisibilityObserver(0.1);

  return (
    <section ref={ref} className={`${className} ${isVisible ? "visible" : ""}`}>
      {children}
    </section>
  );
}

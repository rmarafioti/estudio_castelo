"use client";

import useVisibilityObserver from "../_hooks/useVisibility";

export default function FadeInSection({ children }) {
  const [ref, isVisible] = useVisibilityObserver(0.1);

  return (
    <section ref={ref} className={isVisible ? "visible" : ""}>
      {children}
    </section>
  );
}

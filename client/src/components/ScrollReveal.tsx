
`tsx
import { useEffect, useRef } from "react";
import "../animations/ScrollRevealLore.css";

function ScrollReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

export default ScrollReveal;
`

Use it in lore pages:

`tsx
<ScrollReveal>
  <p>...</p>
</ScrollReveal>
`

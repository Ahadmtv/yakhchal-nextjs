"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const BMICalculator = dynamic(() => import("@/components/BMICalculator"), {
  ssr: false,
  loading: () => <div className="bmi-skeleton" aria-hidden="true"><span /></div>,
});

export default function LazyBMICalculator() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = hostRef.current;
    if (!element || shouldLoad) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "700px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return <div ref={hostRef} className="bmi-lazy deferred-section">{shouldLoad ? <BMICalculator /> : null}</div>;
}

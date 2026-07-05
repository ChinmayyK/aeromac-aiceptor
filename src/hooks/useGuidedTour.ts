"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { getLenis } from "@/components/providers/SmoothScrollProvider";

// Targets derived from ScrollSections.tsx scroll mappings:
// 00 Hero: 0
// 01 Engineering: center ~0.185
// 02 Materials: center ~0.335
// 03 Autonomy: center ~0.47
// 04 Performance: center ~0.60
// 05 Manufacturing: center ~0.73
// 06 Specs: center ~0.855
// 07 CTA: center ~1.0
const TARGET_PROGRESS = [0, 0.185, 0.335, 0.47, 0.60, 0.73, 0.855, 1.0];
const SCROLL_THRESHOLD = 0.015; // Trigger jump after ~1.5% progress past target

export function useGuidedTour(spacerRef: React.RefObject<HTMLDivElement | null>) {
  const [isGuidedMode, setIsGuidedMode] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis || !spacerRef.current || !isGuidedMode) return;

    const handleScroll = (e: Lenis) => {
      if (isAutoScrolling.current) return;

      const spacer = spacerRef.current;
      if (!spacer) return;

      const start = spacer.offsetTop;
      const scrollableDistance = spacer.offsetHeight - window.innerHeight;
      
      // Prevent division by zero if layout isn't fully ready
      if (scrollableDistance <= 0) return;

      let progress = (window.scrollY - start) / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      const currentTarget = TARGET_PROGRESS[activeStep];

      // Scroll Down -> Trigger Jump
      if (e.velocity > 0 && progress > currentTarget + SCROLL_THRESHOLD) {
        if (activeStep < TARGET_PROGRESS.length - 1) {
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          isAutoScrolling.current = true;

          const targetPx = start + TARGET_PROGRESS[nextStep] * scrollableDistance;

          lenis.scrollTo(targetPx, {
            duration: 1.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 4), // Quartic ease-out
            onComplete: () => {
              isAutoScrolling.current = false;
              // If we reached the end, turn off guided mode permanently
              if (nextStep === TARGET_PROGRESS.length - 1) {
                setIsGuidedMode(false);
              }
            },
          });
        }
      }
      // Scroll Up -> Abort Guided Tour
      else if (e.velocity < 0 && progress < currentTarget - SCROLL_THRESHOLD) {
        setIsGuidedMode(false);
      }
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [isGuidedMode, activeStep, spacerRef]);

  return { isGuidedMode, activeStep };
}

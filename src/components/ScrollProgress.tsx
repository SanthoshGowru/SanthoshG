import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProgressProps {
  dayNightProgress: React.MutableRefObject<number>;
}

export default function ScrollProgress({ dayNightProgress }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (progressRef.current) {
          const progress = self.progress;
          progressRef.current.style.transform = `scaleX(${progress})`;
          dayNightProgress.current = progress;

          // Toggle night class after 50%
          if (progress > 0.5) {
            progressRef.current.classList.add('night');
          } else {
            progressRef.current.classList.remove('night');
          }
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [dayNightProgress]);

  return <div ref={progressRef} className="scroll-progress" />;
}

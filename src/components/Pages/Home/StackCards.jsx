import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { projects } from "../../../data/project";
import Card from "./Card";
import { useScroll } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "../../UiComponents/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const StackCards = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        touchMultiplier: 2,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    initLenis();
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  useGSAP(() => {
    const content = gsap.utils.toArray(".content");
    const total = content.length;
    content.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          scrollTrigger: {
            trigger: container.current,
            start: "bottom bottom",
            end: "+=100%",
            scrub: 1,
          },
          y: -(total - index) * 120,
          ease: "power2.out",
        }
      );
    });
  });

  return (
    <div ref={container} className="relative z-20 mt-[40vh] sm:mt-[55vh] min-h-[140vh]">
      <div className="h-screen sticky lg:top-0 top-14 w-full flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between px-4 sm:px-8 md:px-16 lg:px-32">
  <p className="text-[3.5vw] sm:text-sm w-full lg:w-[25%] content max-w-sm lg:max-w-none lg:order-2 order-2 mb-6 lg:mb-0 z-30">
         Kaydırdıkça sahnenin farklı anları üst üste açılır. Her kart, deneyimin içinden bir görünümü yakalar.
        </p>
  <div className="w-[90%] lg:w-[35%] [text-shadow:0_0_5px_#60a5fa,0_0_10px_#60a5fa] relative content lg:order-1 order-1">
          <ScrambleText 
            vwText="text-[6vw] sm:text-[4.5vw] lg:text-[2.5vw]" 
            text="SAHNEDEN KARELER"
          />
        </div>
      </div>
      <div className="content flex flex-col items-center lg:items-stretch mb-[30vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.01;
          return (
            <Card
              key={`${project.title}-${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              onClick={() => project.url && window.open(project.url, '_blank')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StackCards;
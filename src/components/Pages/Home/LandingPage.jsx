import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, memo } from "react";
import ScrambleText from "../../UiComponents/ScrambleText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const LandingPage = ({ navigationOverlayRef }) => {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const textRef5 = useRef(null);
  const imageRef = useRef(null);
  const landingPageRef = useRef(null);

  const sectionMap = {
    "who we are for": "stackcards",
    "our beliefs": "beliefs",
    impact: "provenimpact",
    "how we work": "launchlab",
    team: "team",
    "contact us": "contact",
  };

  const handleNavigation = (e, sectionKey) => {
    e.preventDefault();
    const sectionId = sectionMap[sectionKey];
    if (navigationOverlayRef?.current && sectionId) {
      navigationOverlayRef.current.animateToSection(sectionId);
    }
  };

  

  useGSAP(() => {
    const textElements = [
      imageRef.current,
      textRef.current,
      textRef1.current,
      textRef2.current,
      textRef3.current,
      textRef4.current,
    ];

    gsap.to(textElements, {
      y: -100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: landingPageRef.current,
        start: `top top`,
        end: `bottom 50%`,
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={landingPageRef}
      className="h-screen w-full relative overflow-hidden"
    >
      {/* Subtle tech grid for desktop */}
      <div
        className="hidden md:block absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* İçerik */}
      <div className="absolute z-20 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center flex-col gap-2 px-3 sm:px-0 w-full">
        <div ref={imageRef} className="relative mb-2 flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48">
          <span className="absolute inset-2 rounded-full border border-cyan-300/30 animate-[spin_24s_linear_infinite]" />
          <span className="absolute inset-7 rounded-full border border-blue-300/30 animate-[spin_18s_linear_infinite_reverse]" />
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-400/10 text-2xl font-light tracking-widest text-cyan-100 shadow-[0_0_50px_rgba(56,189,248,.35)]">03</span>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p
            ref={textRef}
            className="will-change-transform text-center text-[clamp(12px,3.6vw,16px)] font-light max-w-[30ch] sm:max-w-[60ch] mx-auto px-2 text-white/90"
          >
            Kaydırdıkça biçim değiştiren, gerçek zamanlı bir 3D web sahnesi.
          </p>

          {/* Büyük başlıklar: her kelime blok, mobilde bölünme yok */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 gap-y-1 justify-center items-center relative px-2 sm:px-0">
            <div className="relative" ref={textRef1}>
              <ScrambleText
                vwText="text-[clamp(22px,8vw,40px)] sm:text-[clamp(28px,3.2vw,64px)] leading-[1.05] tracking-tight"
                className="block sm:inline whitespace-nowrap drop-shadow md:drop-shadow-none"
                text="WEB'İN"
              />
            </div>
            <div className="relative" ref={textRef2}>
              <ScrambleText
                vwText="text-[clamp(22px,8vw,40px)] sm:text-[clamp(28px,3.2vw,64px)] leading-[1.05] tracking-tight"
                className="block sm:inline whitespace-nowrap drop-shadow md:drop-shadow-none"
                text="ÜÇÜNCÜ"
              />
            </div>
            <div className="relative" ref={textRef3}>
              <ScrambleText
                vwText="text-[clamp(22px,8vw,40px)] sm:text-[clamp(28px,3.2vw,64px)] leading-[1.05] tracking-tight"
                className="block sm:inline whitespace-nowrap drop-shadow md:drop-shadow-none"
                text="BOYUTU"
              />
            </div>
          </div>

          <p
            ref={textRef4}
            className="text-center will-change-transform font-medium text-[clamp(12px,3.6vw,14px)] sm:text-base w-[88%] sm:w-[70%] mx-auto leading-relaxed max-w-[32ch] sm:max-w-[60ch] text-balance text-white/85"
          >
            Kaydırdıkça parçacıklar yön değiştiriyor, geometri dönüşüyor. Bu sayfa, gerçek zamanlı 3D sahnenin içine doğru ilerleyen tek bir deneyim.
          </p>
        </div>

        <h1
          ref={textRef5}
          onClick={(e) => handleNavigation(e, "how we work")}
          className="text-center font-bold [text-shadow:0_0_5px_#60a5fa,0_0_10px_#60a5fa] uppercase flex items-center gap-2 pt-4 text-[11px] sm:text-lg px-3 tracking-wide"
        >
          SAHNEYE GİRİN
          <img
            src="/arrowBottomRight.svg"
            alt="arrowDown"
            className="w-3 h-3 sm:w-5 sm:h-5"
          />
        </h1>
      </div>
    </div>
  );
};

export default memo(LandingPage);

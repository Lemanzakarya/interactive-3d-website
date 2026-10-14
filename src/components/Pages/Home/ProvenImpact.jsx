import ProvenCards from "../../UiComponents/ProvenCards";
import ScrambleText from "../../UiComponents/ScrambleText";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const headings = [
  "Web tasarımı ve özel yazılım geliştirme",
  "Mobil uygulamalar ve yapay zeka destekli sistemler"
];

// Paragraphs for each card (sync index with headings)
const cardParagraphs = [
  "Prosedürel geometri, parçacık hareketi ve kaydırma tabanlı anlatımı bir araya getiren kurgusal bir 3D deneyim.",
  "Gerçek zamanlı animasyonlar ve etkileşimli yüzeyler, formun farklı durumlarını keşfetmek için kullanılır."
];

const ProvenImpact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);
  const headingRefMove = useRef(null);
  const firstParaRefMove = useRef(null);
  const provenCardsRef = useRef(null);
  const bottomSectionRef = useRef(null);

  // New refs for text reveal in same position
  const textRevealRef = useRef(null);
  const revealDescriptionRef = useRef(null);
  // Two refs for the two reveal paragraphs
  const revealPara1Ref = useRef(null);
  const revealPara2Ref = useRef(null);

  // State for dynamic heading and paragraph
  const [currentHeading, setCurrentHeading] = useState(0);

  // Handle card change from ProvenCards component
  const handleCardChange = (cardIndex) => {
    setCurrentHeading(cardIndex);
  };

  useGSAP(() => {
    const titleSection = titleSectionRef.current;
    const provenCards = provenCardsRef.current;
    const bottomSection = bottomSectionRef.current;
    const textReveal = textRevealRef.current;
    const para1 = revealPara1Ref.current;
    const para2 = revealPara2Ref.current;

    const cardElements = [provenCards, bottomSection].filter(Boolean);

    // Initial setup for card section (excluding title)
    gsap.set(cardElements, {
      opacity: 0,
      y: 50,
    });

    // Setup title section to stay visible
    gsap.set(titleSection, {
      opacity: 1,
      y: 0,
    });

    // Initial setup for text reveal section (hidden initially)
    gsap.set(textReveal, {
      opacity: 0,
      y: 100,
    });

    // Main timeline for the entire sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        toggleActions: "play none none reverse",
      }
    });

    // Phase 1: Animate card elements in (excluding title)
    cardElements.forEach((element, index) => {
      if (element) {
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }, index * 0.4);
      }
    });

    // Phase 2: Hold for card interactions (4 cards duration)
    tl.to({}, { duration: 4 }, 2);

    // Phase 3: Stagger card elements up and out (excluding title)
    cardElements.forEach((element, index) => {
      if (element) {
        gsap.set(element, {
          transformOrigin: "center center",
          willChange: "transform, opacity"
        });

        tl.to([element, headingRefMove.current, firstParaRefMove.current], {
          y: -300,
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        }, 10 + (index * 0.3));
      }
    });

    // Phase 4: Bring in text reveal section in same position
    tl.to(textReveal, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }, 12);

    // Phase 5: Text reveal animation for both paragraphs, in sync
    if (para1 && para2) {
      // Split text for word-by-word reveal for both paragraphs
      const split1 = SplitText.create(para1, {
        type: "words",
        aria: "hidden"
      });
      const split2 = SplitText.create(para2, {
        type: "words",
        aria: "hidden"
      });

      gsap.set(split1.words, { opacity: 0 });
      gsap.set(split2.words, { opacity: 0 });

      // Animate both paragraphs' words in, in sync (first para then second para)
      tl.to(split1.words, {
        opacity: 1,
        stagger: 0.08,
        duration: 2.2,
        ease: "power2.out",
      }, 13.5);

      tl.to(split2.words, {
        opacity: 1,
        stagger: 0.08,
        duration: 2.2,
        ease: "power2.out",
      }, 13.5 + split1.words.length * 0.08 + 0.2); // start after first para finishes

      // Hold the revealed text
      tl.to({}, { duration: 2 }, 16.5 + split1.words.length * 0.08);

      // Phase 6: First move title section up and out
      tl.to(titleSection, {
        y: -200,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      }, 18.5 + split1.words.length * 0.08);

      // Phase 7: Then move text reveal section up and out (slightly delayed)
      tl.to(revealDescriptionRef.current, {
        y: -200,
        opacity: 0,
        duration: 2.5,
        ease: "power2.inOut",
      }, 19.5 + split1.words.length * 0.08);
    }

  }, []);

  return (
    <div ref={containerRef} className="h-[100vh] w-full relative" id="proven-impact-section">
      <div className="h-[100vh] w-full sticky top-0">
        <div className="lg:w-1/2 md:w-[70%] sm:w-[85%] w-[99vw] h-full relative left-1/2 pt-20 flex lg:justify-end lg:pb-10 md:pb-8 sm:pb-6 pb-6 flex-col lg:gap-5 md:gap-4 sm:gap-3 gap-10 lg:px-12 md:px-8 sm:px-6 px-4 -translate-x-1/2" ref={contentRef}>

          {/* Original card content */}
          <div ref={titleSectionRef} className="flex flex-col lg:gap-2 md:gap-2 sm:gap-1 gap-1 will-change-transform">
            <div className="whitespace-nowrap overflow-hidden [text-shadow:0_0_5px_#60a5fa,0_0_10px_#60a5fa]">
              <ScrambleText vwText="lg:text-[2.5vw] md:text-[3.5vw] sm:text-[5vw] text-[7vw]" textSize="lg:5xl md:4xl sm:3xl text-2xl" text="DENEYİMİN FİKRİ" />
            </div>
            <h1 ref={headingRefMove} className="lg:text-lg md:text-base sm:text-base text-lg uppercase font-bold w-[80%] lg:w-full">
              FORM, HAREKET VE DERİNLİK.
            </h1>
            <p ref={firstParaRefMove} className="lg:text-sm md:text-sm sm:text-sm text-[3.5vw] font-light lg:w-[60%] md:w-[70%] w-[82%]">
              {cardParagraphs[currentHeading]}
            </p>
          </div>

          <div ref={provenCardsRef} className="will-change-transform">
            <ProvenCards onCardChange={handleCardChange} />
          </div>
          <div className="h-[20vh]">

          </div>

          <div ref={bottomSectionRef} className="flex flex-col lg:gap-4 md:gap-3 absolute bottom-20 sm:gap-2 gap-2 will-change-transform">
 
            <div className="lg:w-[86%] md:w-[90%] w-[90%]">
              <ScrambleText vwText="lg:text-3xl md:text-2xl sm:text-xl text-2xl" text={headings[currentHeading]} />
            </div>
          </div>

          {/* Text reveal section - positioned to replace cards */}
          <div ref={textRevealRef} className="absolute inset-0 flex flex-col left-[6%] justify-start pt-40 gap-8 will-change-transform">
            <div className="relative lg:w-[85%] md:w-[90%] w-[90%] flex flex-col gap-6" ref={revealDescriptionRef}>
              <div>
                <p ref={revealPara1Ref} className="text-[4vw] lg:text-base md:text-sm sm:text-sm font-light leading-relaxed" aria-hidden="true">
                  Bu görsel çalışma; parçacık hareketi, gerçek zamanlı 3D ve arayüz animasyonları üzerine kurgusal bir denemedir. İçerik, biçim ve etkileşimin birlikte nasıl çalıştığını araştırır.
                </p>
                <p className="sr-only text-[4vw] lg:text-base md:text-sm sm:text-sm font-light leading-relaxed">
                  Bu görsel çalışma; parçacık hareketi, gerçek zamanlı 3D ve arayüz animasyonları üzerine kurgusal bir denemedir. İçerik, biçim ve etkileşimin birlikte nasıl çalıştığını araştırır.
                </p>
              </div>
              <div>
                <p ref={revealPara2Ref} className="text-[4vw] lg:text-base md:text-sm sm:text-sm font-light leading-relaxed" aria-hidden="true">
                  Kaydırma hareketi sahnenin ritmini belirler; renk ve geometri ilerleyen bölümlerde yeni kompozisyonlara dönüşür.
                </p>
                <p className="sr-only text-[4vw] lg:text-base md:text-sm sm:text-sm font-light leading-relaxed">
                  Kaydırma hareketi sahnenin ritmini belirler; renk ve geometri ilerleyen bölümlerde yeni kompozisyonlara dönüşür.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvenImpact;
// Details.jsx
import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "../../UiComponents/ScrambleText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Details = () => {
  // ===== Refs =====
  const stickyWrapperRef = useRef(null);   // tüm bölüm (scroll yüksekliği burada)
  const mainContainerRef = useRef(null);   // sticky katman
  const paragraphRef = useRef(null);       // açıklama paragrafı (SplitText)
  const line1Ref = useRef(null);           // "HAYAL EDİN,"
  const line2Ref = useRef(null);           // "GERÇEĞE DÖNÜŞTÜRELİM."

useGSAP(() => {
  const stickyEl = stickyWrapperRef.current;

  // Paragrafı SplitText ile kelimelere böl
  const split = SplitText.create(paragraphRef.current, { type: "words", aria: "hidden" });

  // Başlangıç durumları
  gsap.set(line1Ref.current, { opacity: 1, y: 0 });      // HAYAL EDİN sabit ve görünür
  gsap.set(line2Ref.current, { opacity: 0, y: 24 });     // GERÇEĞE... gizli
  gsap.set(split.words,       { opacity: 0 });           // paragraf kelimeleri gizli

  // Tek timeline: uzun bir scroll aralığına yay
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stickyEl,
      start: "top top",
      end: "+=220%",     // daha yavaş akış için aralığı büyük tut
      scrub: true
    }
  });

  // 0%..30%: HAYAL EDİN tek başına (hiçbir şey yapmıyoruz)

  // 30%..50%: GERÇEĞE DÖNÜŞTÜRELİM. yumuşakça belirsin
  tl.addLabel("revealSecond", 0.30)
    .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "revealSecond");

  // 55%..90%: Paragraf kelimeleri teker teker belirsin
  tl.addLabel("revealParagraph", 0.55)
    .to(split.words, { opacity: 1, stagger: 0.03, ease: "none", duration: 1.2 }, "revealParagraph");

  // NOT: line1 (HAYAL EDİN) için herhangi bir fade/opacity animasyonu YOK.
}, []);

  return (
    <div
      ref={stickyWrapperRef}
      className="relative w-full"
      style={{ height: "300vh" }}   // bölüm yüksekliği: 3 ekran
    >
      <div
        ref={mainContainerRef}
        className="sticky top-0 h-[100vh] w-full z-20 overflow-hidden px-4 flex gap-6 flex-col items-center justify-center"
      >
        {/* Başlık (iki satır ayrı ayrı kontrol ediliyor) */}
        <div
          className="
            text-center w-full
            text-cyan-300
            [text-shadow:0_0_10px_rgba(56,189,248,.85),0_0_22px_rgba(56,189,248,.45)]
            drop-shadow-[0_0_24px_rgba(56,189,248,.25)]
          "
        >
          <div className="text-center leading-tight">
            <div ref={line1Ref}>
              <ScrambleText
                vwText="lg:text-[3.7vw] text-[7vw]"
                className="inline"
                text="KAYDIRDIKÇA"
              />
            </div>

            <div ref={line2Ref}>
              <ScrambleText
                vwText="lg:text-[3.7vw] text-[7vw]"
                className="block"
                text="SAHNE DEĞİŞİR"
              />
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div className="relative text-center lg:w-[60%]">
          <p
            ref={paragraphRef}
            className="animate-me text-[2.7vw] lg:text-base"
            aria-hidden="true"
          >
            Aşağı doğru ilerledikçe parçacıklar yön değiştirir, ışık kayar ve sahne yeni bir biçime bürünür.
          </p>

          {/* Erişilebilirlik için görünmeyen kopya */}
          <p className="sr-only text-[2.7vw] lg:text-base">
            Kaydırma konumu animasyon zaman çizgisine bağlanır. İlerledikçe parçacıklar, ışık ve geometri aynı sahnede dönüşür.
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Details);

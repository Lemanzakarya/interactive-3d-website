import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalScene from "../../GlobalScene";
import ScrambleText from "../../UiComponents/ScrambleText";
gsap.registerPlugin(ScrollTrigger);
import About from "./About";

const LaunchLab = () => {
  const launchLabRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const numbersWrapperRef = useRef(null);
  const [segmentIndex, setSegmentIndex] = useState(0); // 0 = ABOUT, 1..4 = modeller
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const contentRef = useRef(null);
  const href1 = useRef(null);
  const href2 = useRef(null);
  const href3 = useRef(null);

  // 🔢 4 model (2,3,4,5 yerine 1,2,3,4 olacak)
  const models = ["RotatedBox", "Torus", "Box", "Sphere"]; // 4 adet

  // 4 içerik (About ayrı; burada sadece 4 segment var)
  const modelContent = [
    { title: "FORM / GEOMETRİ", description: "Prosedürel biçimler, parçacıklar ve ışık aynı sahnede buluşur." },
    { title: "HAREKET", description: "Kaydırma ilerledikçe 3D yapı yeni bir düzene dönüşür." },
    { title: "DERİNLİK", description: "Katmanlı parçacıklar sahneye hacim ve yön duygusu kazandırır." },
    { title: "ETKİLEŞİM", description: "Bu bölüm, kullanıcı hareketi ile gerçek zamanlı görsel tepkiyi araştırır." },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const bgStartPoint = isMobile
      ? "top 60%"
      : isTablet
      ? "top 55%"
      : "top 50%";
    const bgEndPoint = isMobile
      ? "bottom 40%"
      : isTablet
      ? "bottom 45%"
      : "bottom 50%";

    const bgTrigger = ScrollTrigger.create({
      trigger: launchLabRef.current,
      start: bgStartPoint,
      end: bgEndPoint,
      onEnter: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "#dadada",
          ease: "power2.inOut",
        });
        setShouldAnimate(true);
      },
      onLeave: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "black",
          ease: "power2.inOut",
        });
        setShouldAnimate(false);
      },
      onEnterBack: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "#dadada",
          ease: "power2.inOut",
        });
        setShouldAnimate(true);
      },
      onLeaveBack: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "black",
          ease: "power2.inOut",
        });
        setShouldAnimate(false);
      },
    });

    // Toplam 5 segment: 0=ABOUT, 1..4=modeller
    const totalSegments = models.length + 1; // 4 + 1 = 5
    const segmentMultiplier = isMobile ? 0.8 : isTablet ? 0.9 : 1;

    const modelsTrigger = ScrollTrigger.create({
      trigger: launchLabRef.current,
      start: "top top",
      end: () => "+=" + window.innerHeight * totalSegments * segmentMultiplier,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // 0..4 arasında tam sayı (0 = ABOUT)
        const idx = Math.min(
          totalSegments - 1,
          Math.floor(self.progress * totalSegments)
        );
        setSegmentIndex(idx);
      },
    });

    return () => {
      bgTrigger && bgTrigger.kill();
      modelsTrigger && modelsTrigger.kill();
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Başlık/alt yazı giriş animasyonu (yalnızca 1..4'te görünüyor)
  const hasShownOnceRef = useRef(false);
  useEffect(() => {
    if (!textRef.current) return;
    if (segmentIndex < 1) return;

    if (!hasShownOnceRef.current && segmentIndex === 1) {
      gsap.set(textRef.current, { autoAlpha: 1, y: 0 });
      hasShownOnceRef.current = true;
      return;
    }
    gsap.fromTo(
      textRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [segmentIndex]);

  // Sayaç (01..04) başlangıç stilleri
  useEffect(() => {
    if (!numbersWrapperRef.current) return;
    const numbers = numbersWrapperRef.current.querySelectorAll("span");
    numbers.forEach((number, index) => {
      if (index === 0) {
        gsap.set(number, { color: "#000000", scale: 1.1 });
      } else {
        gsap.set(number, { color: "#666666", scale: 1 });
      }
    });
  }, []);

  // Sayaç aktiflik güncellemesi (segmentIndex 1..4 -> 0..3’e eşle)
  useEffect(() => {
    if (!numbersWrapperRef.current) return;
    const numbers = numbersWrapperRef.current.querySelectorAll("span");
    const active = Math.max(segmentIndex - 1, 0); // 0..3
    numbers.forEach((number, index) => {
      if (index === active && segmentIndex >= 1) {
        gsap.to(number, {
          color: "#000000",
          scale: 1.1,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(number, {
          color: "#666666",
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
  }, [segmentIndex]);

  // Üst metinler giriş/çıkış (sadece 1..4’te)
  useEffect(() => {
    // 0. segment About; bu elemanlar 1..4 segmentlerinde render ediliyor.
    if (segmentIndex < 1) return;

    const animeElems = [
      href1.current,
      href2.current,
      href3.current,
      textRef.current,
    ].filter(Boolean);

    if (!animeElems.length || !launchLabRef.current) return;

    gsap.set(animeElems, { y: 60, opacity: 0 });

    gsap.to(animeElems, {
      y: 0,
      stagger: 0.05,
      opacity: 1,
      duration: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: launchLabRef.current,
        start: "top top",
        end: "top -40%",
        scrub: 0.1,
        invalidateOnRefresh: true,
      },
    });
    gsap.to([animeElems, counterRef.current].filter(Boolean), {
      y: -60,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2,
      ease: "power1.in",
      scrollTrigger: {
        trigger: launchLabRef.current,
        start: "bottom bottom",
        end: "bottom 40%",
        scrub: 0.2,
        invalidateOnRefresh: true,
      },
    });
  }, [segmentIndex]);

  // Görüntülenecek index (1..4 → 0..3)
  const displayIdx = Math.max(segmentIndex - 1, 0);

  return (
    <div
      ref={launchLabRef}
      className="relative w-full"
      style={{ height: "600vh" }}
    >
      <div ref={stickyRef} className="sticky top-0 h-[100vh] w-full">
        {/* 0. segment (ABOUT) dışında 3D sahneyi göster */}
        {segmentIndex >= 1 && (
          <GlobalScene
            curGeometry={models[displayIdx]}
            hideControls={true}
            shouldAnimate={shouldAnimate}
          />
        )}

        {/* Overlay içerik */}
        <div
          className="absolute inset-0 z-40 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          {segmentIndex === 0 ? (
            <div className="pointer-events-auto">
              <About />
            </div>
          ) : (
            <div
              ref={contentRef}
              className="text-center flex flex-col items-center w-full 
                         gap-[4vh] md:gap-[5vh] lg:gap-[6vh] launchlab-text"
            >
              {/* Üst satır */}
              <p
                ref={href1}
                className="uppercase tracking-[0.18em] font-medium 
                           text-[11px] md:text-[12px] lg:text-[13px] 
                           text-black/70 [text-shadow:0_0_6px_rgba(0,0,0,.08)]"
                style={{ pointerEvents: "auto" }}
              >
                AŞAĞI KAYDIRARAK DENEYİMLE
              </p>

              {/* Decorative spacer preserves the original scroll composition. */}
              <div className="pointer-events-none h-8 text-[10px] tracking-[0.3em] text-black/45">SCROLL ↓</div>

              {/* Başlık + açıklama */}
              <div
                ref={textRef}
                className="will-change-transform flex pt-4 flex-col items-center gap-3"
              >
                <ScrambleText
                  // desktop'ta ~40px, mobilde ~22–28px
                  vwText="text-[clamp(22px,5vw,40px)]"
                  text={modelContent[displayIdx].title}
                  trigger={displayIdx}
                />
                <p
                  ref={href3}
                  className="mx-auto max-w-[min(64ch,78vw)] 
                             text-[clamp(13px,1.4vw,16px)] leading-[1.7] 
                             font-light text-black/75"
                >
                  {modelContent[displayIdx].description}
                </p>
              </div>

              {/* Sayaç 01–04 (ortada, daha minimal) */}
              <div
                ref={counterRef}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
              >
                <div className="flex gap-4 text-[12px] md:text-[13px] font-semibold text-black/60">
                  <div ref={numbersWrapperRef} className="flex gap-4">
                    <span className="transition-all">01</span>
                    <span className="transition-all">02</span>
                    <span className="transition-all">03</span>
                    <span className="transition-all">04</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchLab;

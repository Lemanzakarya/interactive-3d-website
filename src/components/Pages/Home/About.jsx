import ScrambleText from "../../UiComponents/ScrambleText";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const aboutRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    const verticalEls = [topLineRef.current, bottomLineRef.current].filter(
      Boolean
    );
    if (verticalEls.length) {
      gsap.set(verticalEls, { clipPath: "inset(0 100% 0 0)" });
    }

    gsap.to([topLineRef.current, bottomLineRef.current], {
      clipPath: "inset(0 0% 0 0)",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 0%",
        end: "+=300",
        scrub: 1,
      },
    });
  });

  return (
    <div
      ref={aboutRef}
      className="h-screen w-full flex justify-center sticky top-0 z-20 will-change-transform"
    >
      <div
        ref={topLineRef}
        className="absolute -top-5 left-1/2 -translate-x-1/2"
      >
        <img src="/topEclipse.svg" alt="" />
      </div>
      <div
        ref={bottomLineRef}
        className="absolute top-[92vh] left-1/2 -translate-x-1/2"
      >
        <img src="/bottomEclipse.svg" alt="" />
      </div>

      <div className="h-screen w-[90vw] lg:w-[45vw] flex flex-col justify-center gap-8 px-4">
        <div className="flex flex-col gap-3">
          <div className="relative [text-shadow:0_0_5px_#60a5fa,0_0_10px_#60a5fa] text-center w-full">
            <ScrambleText
              textSize={isMobile ? "3xl" : "4xl"}
              text="BU DENEYİM NEDİR?"
            />
          </div>

          <h3 className="text-sm font-bold telegraf text-black">
            AKILLI YAZILIMLAR, SÜRDÜRÜLEBİLİR ÇÖZÜMLER.
          </h3>
          <p className="text-sm font-light w-full md:w-[65%] text-black">
            Gerçek zamanlı parçacıklar ve prosedürel geometriyle oluşturulan bu sayfa, kaydırma hareketini görsel anlatımın bir parçası hâline getirir. Renk, derinlik ve form; kullanıcı etkileşimine göre birlikte dönüşür.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold telegraf text-black">
            ETKİLEŞİM
          </h3>
          <p className="text-sm font-light w-full md:w-[90%] text-black">
            İşletmeleri, fikirleri ve insanları bir araya getirerek daha büyük
            etki yaratmak.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-bold telegraf text-black">
            HAREKET
          </h3>
          <p className="text-sm font-light w-full md:w-[90%] text-black">
            Güçlü bağlantılar kurmak ve yenilikçi, sürdürülebilir çözümlerle
            fark yaratmak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

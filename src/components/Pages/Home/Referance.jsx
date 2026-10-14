import React, { useState, useEffect } from "react";
import ScrambleText from "../../UiComponents/ScrambleText";
import DomeGallery from "../../UiComponents/referance/DomeGallery";
import "../../UiComponents/referance/Referance.css";

const palettes = [
  ["#00D4FF", "#3023AE"], ["#FA709A", "#FEE140"], ["#43E97B", "#38F9D7"],
  ["#667EEA", "#764BA2"], ["#F6D365", "#FDA085"], ["#A18CD1", "#FBC2EB"],
  ["#89F7FE", "#66A6FF"], ["#F093FB", "#F5576C"], ["#4FACFE", "#00F2FE"],
  ["#30CFD0", "#330867"], ["#C471F5", "#FA71CD"], ["#FAD0C4", "#FFD1FF"],
];

const makeStudy = (index) => {
  const [start, end] = palettes[index % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="26"/></filter></defs><rect width="600" height="600" fill="#090b12"/><circle cx="300" cy="300" r="205" fill="url(#g)" opacity=".22" filter="url(#b)"/><ellipse cx="300" cy="300" rx="205" ry="78" fill="none" stroke="url(#g)" stroke-width="3" transform="rotate(-32 300 300)"/><ellipse cx="300" cy="300" rx="150" ry="64" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="2" transform="rotate(38 300 300)"/><circle cx="300" cy="300" r="46" fill="url(#g)"/><text x="300" y="530" fill="#ffffff" fill-opacity=".7" text-anchor="middle" font-family="sans-serif" font-size="20" letter-spacing="6">STUDY ${String(index + 1).padStart(2, "0")}</text></svg>`;
  return { src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt: `Renk varyasyonu ${String(index + 1).padStart(2, "0")}` };
};

const images = palettes.map((_, index) => makeStudy(index));

const Referance = () => (
  <section id="references" className="w-full pt-40 py-28">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="mb-12 justify-center text-center">
        <div className="relative text-center w-full referance-title">
          <ScrambleText
            vwText="text-[clamp(16px,6vw,36px)] sm:text-[clamp(20px,4vw,44px)] leading-tight"
            className="mx-auto"
            text="AYNI FORM, FARKLI RENKLER"
          />
        </div>
        <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">
          Tek bir soyut kompozisyon, farklı renk paletleriyle yeniden yorumlanır. Görseller SVG olarak sayfa içinde üretilir.
        </p>
      </div>
      <ResponsiveGallery images={images} />
    </div>
  </section>
);

function ResponsiveGallery({ images }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const galleryProps = isMobile
    ? { overlayBlurColor: "transparent", grayscale: false, imageBorderRadius: "9999px", openedImageBorderRadius: "22px", openedImageWidth: "180px", openedImageHeight: "180px", segments: 32, dragSensitivity: 22, fit: 0.7, minRadius: 280 }
    : { overlayBlurColor: "transparent", grayscale: false, imageBorderRadius: "9999px", openedImageBorderRadius: "32px", openedImageWidth: "320px", openedImageHeight: "320px", segments: 48, dragSensitivity: 26, fit: 0.8, minRadius: 580 };

  return <div style={{ height: isMobile ? "60vh" : "70vh", position: "relative" }}><DomeGallery images={images} {...galleryProps} /></div>;
}

export default Referance;

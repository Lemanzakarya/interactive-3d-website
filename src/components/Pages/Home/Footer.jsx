import React from "react";
import ScrambleText from "../../UiComponents/ScrambleText";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Görsel Denemeler", href: "#references" },
    { name: "Yaklaşım", href: "#details" },
    { name: "Kavramsal Modüller", href: "#team" },
    { name: "3D Sahne", href: "#launchlab" },
  ];
  const concepts = ["Prosedürel form", "Parçacık hareketi", "Kaydırma animasyonu", "Gerçek zamanlı 3D"];

  return (
    <footer className="relative z-20 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <ScrambleText vwText="text-1xl md:text-2xl lg:text-3xl" text="INTERACTIVE 3D EXPERIENCE" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              Kaydırma, gerçek zamanlı geometri ve hareketi bir araya getiren bağımsız bir web deneyimi konsepti.
            </p>
            <p className="text-white/50 text-xs leading-relaxed max-w-md">
              Sayfadaki isimler ve görseller kurgusal örneklerdir; gerçek kişi, şirket veya müşteri referansı içermez.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Bölümler</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => <li key={link.href}><a href={link.href} className="text-white/60 hover:text-blue-400 transition-colors duration-300 text-sm">{link.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Deneyim</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {concepts.map((concept) => <li key={concept}>{concept}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10">
          <span className="text-white/50 text-sm">© {currentYear} — INTERACTIVE 3D EXPERIENCE</span>
          <span className="text-white/50 text-xs text-center">KURGUSAL WEBGL KONSEPTİ</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

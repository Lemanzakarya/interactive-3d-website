import React from "react";
import ScrambleText from "../../UiComponents/ScrambleText";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Yaklaşım", href: "#details" },
    { name: "Canlı sahne", href: "#launchlab" },
  ];

  return (
    <footer className="relative z-20 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <ScrambleText vwText="text-1xl md:text-2xl lg:text-3xl" text="FORM / FIELD" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              Kaydırma ile yönlendirilen, tarayıcıda çalışan gerçek zamanlı bir 3D web deneyimi.
            </p>
            <p className="text-white/50 text-xs leading-relaxed max-w-md">
              React, Three.js ve GSAP ile geliştirilmiş tek sayfalık bir WebGL çalışması.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Bölümler</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => <li key={link.href}><a href={link.href} className="text-white/60 hover:text-blue-400 transition-colors duration-300 text-sm">{link.name}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10">
          <span className="text-white/50 text-sm">© {currentYear} — FORM / FIELD</span>
          <span className="text-white/50 text-xs text-center">SCROLL-DRIVEN WEBGL STUDY</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

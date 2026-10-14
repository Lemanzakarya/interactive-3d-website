import React from "react";
import ScrambleText from "../../UiComponents/ScrambleText";
import ProfileCard from "../../UiComponents/Profile/ProfileCard";

const moduleNames = [
  ["FORM", "Procedural geometry"], ["MOTION", "Scroll animation"], ["DEPTH", "Particle systems"],
  ["COLOR", "Real-time shading"], ["SPACE", "3D composition"], ["INPUT", "User interaction"],
];

const createAvatar = (label, index) => {
  const hue = (index * 49 + 190) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${hue} 90% 58%)"/><stop offset="1" stop-color="hsl(${(hue + 95) % 360} 85% 32%)"/></linearGradient></defs><rect width="400" height="500" fill="#090b12"/><circle cx="200" cy="220" r="135" fill="url(#g)" opacity=".85"/><circle cx="200" cy="220" r="92" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2"/><ellipse cx="200" cy="220" rx="152" ry="56" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" transform="rotate(-32 200 220)"/><text x="200" y="435" fill="#fff" text-anchor="middle" font-family="sans-serif" font-size="22" letter-spacing="5">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const modules = moduleNames.map(([name, title], index) => ({
  name,
  title,
  handle: `module-${String(index + 1).padStart(2, "0")}`,
  avatar: createAvatar(name, index),
}));

const Team = () => (
  <section className="w-full py-28 relative z-0 isolate">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="mb-12 justify-center text-center">
        <div className="relative text-center w-full referance-title">
          <ScrambleText textSize="5xl" text="DENEYİMİN KATMANLARI" />
        </div>
        <p className="mt-8 text-sm md:text-base text-white/70 leading-relaxed">
          Bu kartlar gerçek kişi profilleri değil; 3D web deneyiminin parçacık, hareket ve geometri gibi kurgusal bileşenlerini gösterir.
        </p>
      </div>
      <div className="grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ProfileCard
            key={module.handle}
            name={module.name}
            title={module.title}
            handle={module.handle}
            status="CONCEPT"
            contactText=""
            avatarUrl={module.avatar}
            miniAvatarUrl={module.avatar}
            showUserInfo={false}
            enableTilt
            enableMobileTilt={false}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Team;

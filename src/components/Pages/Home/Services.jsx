import ScrambleText from "../../UiComponents/ScrambleText";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Inline icon components so icons are crisp, themable and consistent
const IconMegaphone = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 10v4a1 1 0 001 1h2l6 3V6L6 9H4a1 1 0 00-1 1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 8v8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconStrategy = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 3v6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21v-6h-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
  </svg>
);

const IconAnalytics = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 3v18h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 13v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9v8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 5v12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTasks = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 11l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconAI = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="7"
      y="3"
      width="10"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 7v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 21v-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 21v-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconWeb = ({ className = "h-6 w-6 text-white drop-shadow-sm" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2.5 12h19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 2.5v19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const services = [
  {
    id: 1,
    title: "Gerçek Zamanlı 3D",
    desc: "Prosedürel geometri ve parçacık sistemleriyle canlı sahneler oluşturur.",
    Icon: IconMegaphone,
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Kaydırma ile Anlatım",
    desc: "Kaydırma hareketini sahne geçişlerine ve animasyon akışına bağlar.",
    Icon: IconStrategy,
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: 3,
    title: "Hareket Tasarımı",
    desc: "Katmanlar ve parçacıklar arasında akıcı görsel geçişler kurar.",
    Icon: IconAnalytics,
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: 4,
    title: "Etkileşim",
    desc: "Kullanıcı girdileri ile görsel sahne arasındaki bağı araştırır.",
    Icon: IconTasks,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    title: "Prosedürel Form",
    desc: "Temel geometriler kodla yeni biçimlere dönüştürülür.",
    Icon: IconAI,
    color: "from-pink-400 to-fuchsia-500",
  },
  {
    id: 6,
    title: "Duyarlı Deneyim",
    desc: "Sahne farklı ekran boyutlarında çalışacak şekilde uyarlanır.",
    Icon: IconWeb,
    color: "from-sky-400 to-indigo-500",
  },
];

export default function Services() {
  const rootRef = useRef(null);

  useGSAP(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current.querySelectorAll(".service-card"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
    );
  }, []);

  return (
    <section id="services" ref={rootRef} className="w-full py-16 md:py-24 relative z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-6">
       <div className="relative text-center w-full referance-title">
                   <ScrambleText textSize="5xl" text="DENEYİMİN KATMANLARI" />
                 </div>
        <p className="text-[15px] text-center mt-4 mb-6 leading-relaxed text-white/80 max-w-2xl mx-auto px-2 md:px-0">
          Bu bölüm, 3D deneyimi oluşturan görsel ve teknik fikirleri özetler.
        </p>
        {/* Auto-fit grid: mobil 1, md 2, lg 3 sütun */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s) => (
            <article
              key={s.id}
              className="service-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-7 backdrop-blur-md shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* üst glow */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl before:absolute before:inset-[-1px] before:rounded-[inherit] before:bg-[radial-gradient(120px_120px_at_50%_-20%,rgba(0,212,255,0.35),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100" />

              <div className="relative z-10 flex items-center gap-4">
                <div className={`grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-sm shadow-inner`}> 
                  <div className={`rounded-md p-2 sm:p-2.5 bg-gradient-to-br ${s.color} from-opacity-20 to-opacity-20`}> 
                    <s.Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-[17px] font-semibold leading-tight text-white">
                  {s.title}
                </h3>
              </div>

              <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/75">
                {s.desc}
              </p>

              {/* alt renk şeridi */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400/30 via-fuchsia-400/30 to-yellow-300/30 opacity-80" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

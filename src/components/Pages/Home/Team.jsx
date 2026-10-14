import ScrambleText from "../../UiComponents/ScrambleText";

const implementation = [
  { number: "01", title: "Three.js + R3F", description: "Gerçek zamanlı 3D sahne ve geometri tarayıcıda çizilir." },
  { number: "02", title: "GSAP ScrollTrigger", description: "Kaydırma konumu, sahne geçişlerini ve animasyon zaman çizgisini kontrol eder." },
  { number: "03", title: "Lenis", description: "Sayfa kaydırmasına yumuşak ve tutarlı bir akış kazandırır." },
  { number: "04", title: "React + Vite", description: "Arayüz bileşenlerini ve geliştirme sürecini bir arada tutar." },
];

const Team = () => (
  <section id="team" className="relative z-0 isolate w-full py-28">
    <div className="container mx-auto max-w-6xl px-6">
      <div className="mb-12 text-center">
        <div className="referance-title relative w-full text-center">
          <ScrambleText textSize="5xl" text="TEKNİK NOTLAR" />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          Bu çalışma, gerçek zamanlı 3D sahneyi kaydırma ile yönlendirilen bir arayüzün içine yerleştirir.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {implementation.map((item) => (
          <article key={item.number} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <p className="mb-8 text-xs tracking-[0.2em] text-cyan-200/70">{item.number}</p>
            <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-relaxed text-white/65">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Team;

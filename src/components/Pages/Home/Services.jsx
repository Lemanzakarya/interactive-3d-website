import ScrambleText from "../../UiComponents/ScrambleText";

const steps = [
  {
    number: "01",
    title: "Kaydırarak ilerle",
    description: "Sayfayı aşağı kaydır. Her hareket, 3D sahnede yeni bir ana geçiş yapar.",
  },
  {
    number: "02",
    title: "Dönüşümü izle",
    description: "Biçimlerin, ışığın ve parçacıkların sahne boyunca nasıl değiştiğini keşfet.",
  },
  {
    number: "03",
    title: "Kendi ritmini bul",
    description: "İstediğin yerde dur, etrafına bak ve hazır olduğunda devam et.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-30 w-full px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <ScrambleText textSize="5xl" text="DENEYİMİ KEŞFET" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Bu sayfa, kaydırdıkça değişen tek bir 3D sahne etrafında tasarlandı.
            En iyi şekilde keşfetmek için aşağı doğru ilerle.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-white/15 bg-black/45 p-6 backdrop-blur-md sm:p-8"
            >
              <span className="text-sm tracking-[0.2em] text-cyan-200">{step.number}</span>
              <h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#landing"
            className="inline-flex items-center gap-3 border-b border-cyan-200/70 pb-2 text-sm text-white transition-colors hover:text-cyan-200"
          >
            Deneyimi baştan keşfet <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

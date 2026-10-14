import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Artifact({ active }) {
  const group = useRef();
  const ring = useRef();
  const satellite = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 4);
    const speed = active ? 0.68 : 0.18;
    if (group.current) {
      group.current.rotation.x = 0.18 + Math.sin(t * speed * 0.42) * 0.11 + progress * 0.08;
      group.current.rotation.y = t * speed + progress * 0.54;
      group.current.rotation.z = Math.cos(t * speed * 0.3) * 0.08;
      group.current.position.y = Math.sin(t * 0.34) * 0.1 - Math.min(progress, 2.5) * 0.12;
      group.current.position.x = 1.2 - Math.min(progress, 2) * 0.36;
    }
    if (ring.current) ring.current.rotation.z = -t * speed * 0.55 - progress * 0.3;
    if (satellite.current) satellite.current.rotation.y = t * speed * 1.7;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.12, 5]} />
        <meshPhysicalMaterial color="#c9f567" metalness={0.68} roughness={0.23} clearcoat={1} clearcoatRoughness={0.18} />
      </mesh>
      <mesh scale={1.025}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshBasicMaterial color="#f1ffd4" wireframe transparent opacity={0.16} />
      </mesh>
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2.25, 0.12, 0]}>
          <torusGeometry args={[1.72, 0.009, 8, 180]} />
          <meshBasicMaterial color="#d9ff93" transparent opacity={0.62} />
        </mesh>
        <mesh rotation={[0.72, 0.3, 0.34]}>
          <torusGeometry args={[2.05, 0.006, 8, 180]} />
          <meshBasicMaterial color="#f1f1e9" transparent opacity={0.3} />
        </mesh>
      </group>
      <group ref={satellite}>
        <mesh position={[1.76, 0.2, 0.12]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color="#f4f1e8" emissive="#d8ff93" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-1.65, -0.48, 0.22]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#d7e9b4" />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ active }) {
  return (
    <>
      <color attach="background" args={["#11130f"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 5, 6]} intensity={2.3} color="#f3ffd8" />
      <pointLight position={[-4, -2, 3]} intensity={18} distance={12} color="#8daa5d" />
      <Artifact active={active} />
    </>
  );
}

const explorations = [
  { number: "01", title: "Form", text: "Geometriler, ışığa göre değişen yüzeyler ve canlı bir merkez." },
  { number: "02", title: "Hareket", text: "Zaman ve kaydırma, sahnenin ritmini birlikte belirler." },
  { number: "03", title: "Derinlik", text: "Tipografi ve içerik, üç boyutlu alanla aynı anlatıda buluşur." },
];

function App() {
  const [active, setActive] = useState(false);
  const topRef = useRef(null);

  return (
    <main ref={topRef}>
      <div className="scene-layer" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ alpha: false, antialias: true, powerPreference: "low-power" }}
          fallback={<div className="scene-fallback">3D sahne bu tarayıcıda görüntülenemiyor.</div>}
        >
          <Suspense fallback={null}><Scene active={active} /></Suspense>
        </Canvas>
      </div>

      <header className="site-header">
        <a className="mark" href="#top" aria-label="Başlangıca dön">
          <span className="mark-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>INTERACTIVE<br /><b>WEB STUDY / 01</b></span>
        </a>
        <nav aria-label="Sayfa bölümleri">
          <a href="#deneyim">Deneyim</a>
          <a href="#sistem">Sistem</a>
          <a href="#notlar">Notlar</a>
        </nav>
        <span className="header-index">3D / WEBGL</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> FORM · IŞIK · HAREKET</p>
          <h1>Dijital alan<br />hareketle <em>açılır.</em></h1>
          <p className="hero-intro">
            Kaydırma ile değişen, prosedürel bir 3D sahne etrafında tasarlanmış etkileşimli web deneyimi.
          </p>
          <div className="hero-actions">
            <a className="line-link" href="#deneyim">Deneyime gir <span aria-hidden="true">↓</span></a>
            <button className="motion-toggle" type="button" aria-pressed={active} onClick={() => setActive(!active)}>
              <span className={active ? "toggle-indicator is-active" : "toggle-indicator"} />
              {active ? "Hareketi yavaşlat" : "Hareketi hızlandır"}
            </button>
          </div>
        </div>
        <div className="hero-aside" aria-hidden="true">
          <span>PROCEDURAL OBJECT</span>
          <span>SCROLL TO TRANSFORM ↘</span>
        </div>
        <div className="hero-foot"><span>AN INTERACTIVE WEB STUDY</span><span>01 — 03</span></div>
      </section>

      <section className="experience section-grid" id="deneyim">
        <div className="section-number"><span>01</span><i /></div>
        <div className="experience-copy">
          <p className="eyebrow">SAHNE / 01</p>
          <h2>Bir biçim.<br /><span>Birden çok hâl.</span></h2>
          <p>
            Merkezdeki nesne, sayfa ilerledikçe yön değiştirir. Işık ve yörüngeler,
            arayüzün parçası gibi davranır; içerik de sahnenin ritmine katılır.
          </p>
          <a className="line-link" href="#sistem">Sistemi incele <span aria-hidden="true">↓</span></a>
        </div>
        <div className="experience-note"><span>SCROLL POSITION</span><b>CHANGES THE SCENE</b><i>↗</i></div>
      </section>

      <section className="system section-grid" id="sistem">
        <div className="section-number"><span>02</span><i /></div>
        <div className="system-content">
          <p className="eyebrow">ETKİLEŞİM SİSTEMİ</p>
          <h2>Basit kurallar.<br /><em>Canlı bir sahne.</em></h2>
          <div className="explorations">
            {explorations.map((item) => (
              <article className="exploration" key={item.number}>
                <span className="exploration-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="exploration-mark" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing section-grid" id="notlar">
        <div className="section-number"><span>03</span><i /></div>
        <div className="closing-content">
          <p className="eyebrow">SON NOT / KONSEPT ÇALIŞMASI</p>
          <h2>Web, yalnızca<br /><span>bir yüzey değil.</span></h2>
          <p>
            Bu bağımsız çalışma; prosedürel 3D grafiklerin, kaydırma anlatısının ve
            tipografinin tek bir web deneyiminde buluşmasını araştırır. Metinler ve
            sahne içeriği örnek amaçlıdır.
          </p>
          <a className="line-link" href="#top">Başa dön <span aria-hidden="true">↑</span></a>
        </div>
        <div className="closing-orbit" aria-hidden="true"><span>END OF STUDY</span><i /></div>
      </section>

      <footer className="site-footer">
        <span>INTERACTIVE WEB STUDY / 01</span>
        <span>PROCEDURAL 3D · SCROLL-LED EXPERIENCE</span>
      </footer>
    </main>
  );
}

export default App;

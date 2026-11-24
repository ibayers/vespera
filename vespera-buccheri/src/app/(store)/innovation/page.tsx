import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PreorderBanner from "@/components/PreorderBanner";
import { INSOLES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Innovation — The Insole System",
  description:
    "Interchangeable insole system Vespera: Cloudwalk, Boardroom, Activeflex. Satu pasang sepatu untuk setiap kebutuhan.",
};

const STEPS = [
  { num: "01", title: "Choose your pair", desc: "Select a silhouette in Noir or Bianco, sizes EU 36–45." },
  { num: "02", title: "Choose your insole", desc: "Pick the footbed bundle that matches your day — or add extras." },
  { num: "03", title: "Swap in seconds", desc: "Change insoles in seconds. One pair, many purposes." },
];

// baris: [fitur, cloudwalk, boardroom, activeflex]
const COMPARE: [string, boolean, boolean, boolean][] = [
  ["PLUSH CUSHIONING", true, false, true],
  ["ARCH SUPPORT", true, true, false],
  ["FIRM HEEL CUP", false, true, false],
  ["ENERGY RETURN", false, false, true],
  ["BREATHABLE WEAVE", true, false, true],
];

export default function InnovationPage() {
  return (
    <>
      {/* HERO */}
      <section className="inn-hero">
        <div className="bg" style={{ backgroundImage: "url('/images/innovation-hero.jpg?v=2')" }} aria-hidden="true" />
        <div className="content">
          <span className="eyebrow">THE INSOLE SYSTEM</span>
          <h1 className="display">One pair.<br /><em style={{ fontStyle: "italic" }}>Different needs.</em></h1>
          <p className="sub">Tiga footbed yang direkayasa untuk tiga ritme hidup. Berganti dalam hitungan detik — tanpa alat, tanpa ribet.</p>
          <Link className="btn btn-primary" href="#compare">EXPLORE THE SYSTEM ↓</Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="burgundy-section on-light" aria-labelledby="how-h">
        <div className="center-head">
          <Reveal>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2 className="display section-title" id="how-h">Swap in seconds.</h2>
          </Reveal>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <Reveal key={s.num} className="step" >
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSOLE SPLITS */}
      {INSOLES.map((i) => (
        <section key={i.slug} className="inn-split" aria-labelledby={`${i.slug}-h`}>
          <Reveal className="img-wrap">
            <Image src={i.image} alt={`Insole ${i.name}`} width={640} height={608} loading="lazy" />
          </Reveal>
          <div className="body">
            <Reveal>
              <span className="role">{i.role}</span>
              <h3 id={`${i.slug}-h`}>{i.name}</h3>
              <p>{i.desc}</p>
              <ul className="feature-list">
                {i.features.map((f) => <li key={f}>— {f}</li>)}
              </ul>
              <span className="eyebrow" style={{ color: "var(--burgundy)" }}>
                {i.price === 0 ? "INCLUDED IN EVERY PAIR" : `${i.priceLabel} — ADD TO ANY PAIR`}
              </span>
            </Reveal>
          </div>
        </section>
      ))}

      {/* COMPARE */}
      <section className="compare-section burgundy-section" id="compare" aria-labelledby="cmp-h">
        <div className="center-head">
          <Reveal>
            <span className="eyebrow">COMPARE THE FOOTBEDS</span>
            <h2 className="display section-title on-dark" id="cmp-h">Find your sole-mate.</h2>
          </Reveal>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th />
                {INSOLES.map((i) => <th key={i.slug} style={{ color: "var(--cream)" }}>{i.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((on, idx) => (
                    <td key={idx}><span className={`dot${on ? "" : " off"}`}>●</span></td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>PRICE</td>
                {INSOLES.map((i) => <td key={i.slug}>{i.price === 0 ? "Included" : i.priceLabel}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cta-row"><Link className="btn btn-primary" href="/products/vespera-alta">CONFIGURE YOUR PAIR</Link></div>
      </section>

      {/* TUTORIAL */}
      <section className="film-section" aria-labelledby="tut-h">
        <div className="head">
          <Reveal>
            <span className="eyebrow">THE TUTORIAL</span>
            <h2 className="display section-title on-dark" id="tut-h">Swap in seconds.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="video-frame">
            {/* ponytail: webm saja — Safari lama butuh fallback MP4 (H.264) saat produksi, PRD §12.2 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/insole-activeflex.jpg?v=5"
              aria-label="Tutorial penggantian insole Vespera"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/videos/insole-tutorial.webm" type="video/webm" />
            </video>
            <span className="duration-pill">PREVIEW INSOLE</span>
          </div>
        </Reveal>
      </section>

      <PreorderBanner />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import InsoleCard from "@/components/InsoleCard";
import PreorderBanner from "@/components/PreorderBanner";
import { PRODUCTS, INSOLES } from "@/lib/catalog";
import { ArrowRight, PlayIcon } from "@/components/icons";

const STEPS = [
  { num: "01", title: "Choose your pair", desc: "Select a silhouette in Noir or Bianco, sizes EU 36–45." },
  { num: "02", title: "Choose your insole", desc: "Pick the footbed bundle that matches your day — or add extras." },
  { num: "03", title: "Swap in seconds", desc: "Change insoles in seconds. One pair, many purposes." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: "url('/images/hero.jpg?v=2')" }} aria-labelledby="hero-h">
        <div className="hero-content">
          <span className="pill">PRE-ORDER · BATCH 01 — 2026</span>
          <h1 className="display" id="hero-h">One pair. <em>Different needs.</em></h1>
          <p className="sub">
            Premium leather footwear with interchangeable insoles — one beautifully made pair that adapts to every side of your day.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/collection">EXPLORE THE COLLECTION</Link>
            <a className="btn btn-ghost" href="#film"><PlayIcon size={13} /> WATCH THE FILM — 0:24</a>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <Reveal>
          <div className="hairline" aria-hidden="true" />
        </Reveal>
        <Reveal>
          <blockquote>
            Vespera is built on a simple idea — that a single, beautifully made pair of shoes should adapt to the way you live. Not the other way around.
          </blockquote>
        </Reveal>
        <Reveal>
          <p className="signature">— VESPERA BUCCHERI, JAKARTA</p>
        </Reveal>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="white-section" aria-labelledby="fc-h">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">01 — THE COLLECTION</span>
              <h2 className="display section-title" id="fc-h">The First Collection</h2>
            </div>
            <Link className="arrow-link" href="/collection">
              VIEW ALL 6 STYLES <ArrowRight />
            </Link>
          </div>
          {/* Vespera Luce disembunyikan dari featured grid (request user) —
              hapus filter untuk menampilkan kembali 3 kartu */}
          <div className="product-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {PRODUCTS.slice(0, 3)
              .filter((p) => p.slug !== "vespera-luce")
              .map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* INSOLE SYSTEM */}
      <section className="burgundy-section" aria-labelledby="ins-h">
        <div className="center-head">
          <Reveal>
            <span className="eyebrow">02 — THE INSOLE SYSTEM</span>
            <h2 className="display section-title on-dark" id="ins-h">One pair. Every need.</h2>
            <p style={{ fontSize: 15, lineHeight: "24px", color: "rgba(243,233,220,.8)" }}>
              Every Vespera pair is built around our interchangeable insole system — engineered footbeds, no tools, no fuss.
            </p>
          </Reveal>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <Reveal key={s.num} className="step">
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <div className="insole-grid">
          {INSOLES.map((i) => <InsoleCard key={i.slug} insole={i} />)}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="story-teaser" id="story" aria-label="Our story">
        <Reveal className="img-wrap">
          <Image src="/images/story.jpg?v=3" alt="Sepatu Vespera dengan packaging burgundy" width={640} height={736} loading="lazy" />
        </Reveal>
        <div className="body">
          <Reveal>
            <span className="eyebrow">03 — OUR STORY</span>
            <p className="display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", fontStyle: "italic", color: "var(--burgundy)" }}>
              Quiet luxury, made to move.
            </p>
            <p style={{ fontSize: 15, lineHeight: "26px", color: "#3d3129", maxWidth: 460, marginTop: 24 }}>
              Vespera began with a question: why should elegance end where comfort begins? Designed in Jakarta and crafted with premium leather, each pair carries our burgundy signature — made for the commute, the meeting, and everything after.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link className="arrow-link" href="#story">READ OUR STORY <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGN FILM */}
      <section className="film-section" id="film" aria-labelledby="film-h">
        <div className="head">
          <Reveal>
            <span className="eyebrow">04 — THE VESPERA FILM</span>
            <h2 className="display section-title on-dark" id="film-h">Craft in motion.</h2>
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
              poster="/images/film.jpg?v=2"
              aria-label="Brand film Vespera — sepatu kulit dalam proses pembuatan"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/videos/brand-film.webm" type="video/webm" />
            </video>
            <span className="duration-pill">BRAND FILM — 0:30</span>
          </div>
        </Reveal>
      </section>

      <PreorderBanner />
    </>
  );
}

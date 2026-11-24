import type { Metadata } from "next";
import CollectionBrowser from "@/components/CollectionBrowser";
import InsoleCard from "@/components/InsoleCard";
import PreorderBanner from "@/components/PreorderBanner";
import Reveal from "@/components/Reveal";
import { PRODUCTS, INSOLES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Enam siluet premium leather footwear dengan interchangeable insoles. Pre-order Batch 01 — Noir & Bianco, EU 36–45.",
};

export default function CollectionPage() {
  return (
    <>
      <section className="page-head">
        <span className="eyebrow">BATCH 01 — PRE-ORDER NOW OPEN</span>
        <h1 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>The First Collection</h1>
        <p className="sub">Six silhouettes. Two colours. One interchangeable soul.</p>
      </section>

      {/* Petra, Notte, Aria, Luce disembunyikan dari grid (request user) —
          hapus filter untuk menampilkan kembali 6 kartu */}
      <CollectionBrowser
        products={PRODUCTS.filter(
          (p) => !["vespera-petra", "vespera-notte", "vespera-aria", "vespera-luce"].includes(p.slug)
        )}
      />

      {/* Insole strip */}
      <section className="burgundy-section" aria-labelledby="cs-h">
        <div className="center-head">
          <Reveal>
            <span className="eyebrow">THE INSOLE SYSTEM</span>
            <h2 className="display section-title on-dark" id="cs-h">One pair. Every need.</h2>
          </Reveal>
        </div>
        <div className="insole-grid">
          {INSOLES.map((i) => <InsoleCard key={i.slug} insole={i} withFeatures={false} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a className="btn btn-primary" href="/innovation">EXPLORE THE SYSTEM</a>
        </div>
      </section>

      <PreorderBanner />
    </>
  );
}

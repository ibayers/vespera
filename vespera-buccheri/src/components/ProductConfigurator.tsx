"use client";

import Image from "next/image";
import { useState } from "react";
import {
  buildWhatsAppLink, formatIDR, EXTRA_INSOLE_PRICE,
  type Product, type Insole,
} from "@/lib/catalog";
import { ClockIcon, WhatsAppIcon } from "./icons";

const SIZE_TABLE = [
  ["36", "22.5", "4.5"], ["37", "23.1", "5"], ["38", "23.8", "6"], ["39", "24.5", "7"],
  ["40", "25.1", "7.5"], ["41", "25.7", "8"], ["42", "26.4", "9"], ["43", "27.0", "10"],
  ["44", "27.7", "10.5"], ["45", "28.3", "11"],
];

export default function ProductConfigurator({ product, insoles }: { product: Product; insoles: Insole[] }) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [color, setColor] = useState(product.color === "noir" ? "Noir" : "Bianco");
  const [size, setSize] = useState<string | null>(null);
  const [bundle, setBundle] = useState(insoles[0]?.name ?? "Cloudwalk");
  const [extra, setExtra] = useState(false);

  const bundlePrice = insoles.find((i) => i.name === bundle)?.price ?? 0;
  const total = product.price + bundlePrice + (extra ? EXTRA_INSOLE_PRICE : 0);

  const go = () => {
    if (!size) {
      alert("Mohon pilih ukuran terlebih dahulu.");
      return;
    }
    window.open(
      buildWhatsAppLink({ productName: product.name, color, size, bundle, extraInsole: extra, total }),
      "_blank",
      "noopener"
    );
  };

  return (
    <div className="pd-layout">
      {/* Gallery — 2 foto terpilih dihapus dari data (request user) */}
      <div className="pd-gallery">
        <div className="pd-main-img">
          <Image
            key={product.gallery[galleryIdx]}
            src={product.gallery[galleryIdx]}
            alt={`${product.name} — foto ${galleryIdx + 1}`}
            width={720} height={756} priority={galleryIdx === 0}
          />
        </div>
        {product.gallery.length > 1 && (
          <div className="pd-thumbs" aria-label="Galeri produk">
            {product.gallery.map((src, i) => (
              <button
                key={src}
                className={i === galleryIdx ? "active" : ""}
                onClick={() => setGalleryIdx(i)}
                aria-label={`Foto ${i + 1}`}
              >
                <Image src={src} alt="" width={120} height={120} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pd-info">
        <div className="pd-title-row">
          <span className="eyebrow">BATCH 01 — PRE-ORDER</span>
          <h1 className="pd-title">{product.name}</h1>
          <span className="pd-variant-lbl">{product.colorLabel}</span>
        </div>
        <p className="pd-price">{formatIDR(total)}</p>
        <p className="pd-promo"><ClockIcon /> PRE-ORDER BATCH 01 — SHIPS MAR 2026 · 50% DP AVAILABLE</p>
        <p className="pd-desc">{product.description}</p>

        <div className="option-group">
          <div className="option-head"><span className="lbl">COLOUR</span><span className="hint">{color.toUpperCase()}</span></div>
          <div className="swatches">
            <button
              className={`swatch noir${color === "Noir" ? " active" : ""}`}
              onClick={() => setColor("Noir")} aria-label="Warna Noir" title="Noir"
            />
            <button
              className={`swatch bianco${color === "Bianco" ? " active" : ""}`}
              onClick={() => setColor("Bianco")} aria-label="Warna Bianco" title="Bianco"
            />
          </div>
        </div>

        <div className="option-group">
          <div className="option-head"><span className="lbl">SIZE — EU SIZING</span><a className="hint" href="#size-guide">SIZE GUIDE</a></div>
          <div className="sizes">
            {SIZE_TABLE.map(([eu]) => (
              <button
                key={eu}
                className={`size-btn${size === eu ? " active" : ""}`}
                onClick={() => setSize(eu)}
              >
                {eu}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <div className="option-head"><span className="lbl">INSOLE BUNDLE</span><span className="hint">{bundle.toUpperCase()} INCLUDED</span></div>
          <div className="bundle-options">
            {insoles.map((i) => (
              <button
                key={i.slug}
                className={`bundle-option${bundle === i.name ? " active" : ""}`}
                onClick={() => setBundle(i.name)}
              >
                <span>
                  <span className="b-name">{i.name.toUpperCase()}</span>
                  <span className="b-sub" style={{ display: "block" }}>{i.desc.split(".")[0]}</span>
                </span>
                <span className="b-price">{i.price === 0 ? "INCLUDED" : "+" + formatIDR(i.price)}</span>
              </button>
            ))}
          </div>
          <button className="add-extra" style={{ marginTop: 4 }} onClick={() => setExtra((v) => !v)}>
            {extra
              ? `✓ EXTRA INSOLE DITAMBAHKAN — ${formatIDR(EXTRA_INSOLE_PRICE)} (klik untuk hapus)`
              : `+ ADD EXTRA INSOLE — ${formatIDR(EXTRA_INSOLE_PRICE)}`}
          </button>
        </div>

        <div className="pd-ctas">
          <button className="btn btn-dark btn-block" onClick={go}>
            <span>ADD TO CART — {formatIDR(total)}</span>
          </button>
          <button className="btn btn-wa btn-block" onClick={go}>
            <WhatsAppIcon /> ORDER VIA WHATSAPP
          </button>
        </div>

        <div className="pd-accordions" id="size-guide">
          <details open>
            <summary>DETAILS &amp; MATERIAL</summary>
            <div className="acc-body">
              {product.details.map((d) => (
                <p key={d.label}><strong>{d.label}:</strong> {d.value}</p>
              ))}
            </div>
          </details>
          <details>
            <summary>SHIPPING &amp; PRE-ORDER</summary>
            <div className="acc-body">
              <p>Batch 01 diproduksi setelah window pre-order ditutup. Estimasi pengiriman: 8–10 minggu (Mar 2026).</p>
              <p>Pembayaran: full payment atau DP 50% + pelunasan sebelum pengiriman.</p>
              <p>Gratis ongkir seluruh Indonesia untuk Batch 01.</p>
            </div>
          </details>
          <details>
            <summary>SIZE GUIDE</summary>
            <div className="acc-body">
              <table className="size-table">
                <thead><tr><th>EU</th><th>PANJANG KAKI (CM)</th><th>US (M)</th></tr></thead>
                <tbody>
                  {SIZE_TABLE.map((row) => (
                    <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: 12, color: "#6E6155" }}>Ukur kaki di sore hari untuk hasil paling akurat. Jika di antara dua ukuran, ambil yang lebih besar.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

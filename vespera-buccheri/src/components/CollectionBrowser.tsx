"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";

type Filter = "all" | "noir" | "bianco";

export default function CollectionBrowser({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? products : products.filter((p) => p.color === filter);

  return (
    <>
      <div className="filter-bar">
        <span>{products.length} STYLES</span>
        <div className="filter-groups">
          <div className="filter-group" role="group" aria-label="Filter warna">
            <span className="lbl">COLOUR</span>
            {(["all", "noir", "bianco"] as const).map((f) => (
              <button
                key={f}
                className={`filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "noir" ? "Noir" : "Bianco"}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <span className="lbl">SORT</span>
            <button className="filter-btn active">Featured</button>
          </div>
        </div>
      </div>
      <section className="collection-grid" aria-label="Katalog produk">
        {/* ≤2 produk terlihat: kartu ukuran normal, dipusatkan */}
        <div className={`product-grid${shown.length <= 2 ? " pair" : ""}`}>
          {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}

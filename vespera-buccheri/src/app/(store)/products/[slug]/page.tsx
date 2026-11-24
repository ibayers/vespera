import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductCard from "@/components/ProductCard";
import PreorderBanner from "@/components/PreorderBanner";
import { PRODUCTS, INSOLES, getProduct } from "@/lib/catalog";
import { ArrowRight } from "@/components/icons";

export const dynamicParams = false; // semua slug dikenal saat build — slug tak dikenal 404 di routing

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.color === "noir" ? "Noir" : "Bianco"} · Full Grain Leather`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const alsoLike = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">HOME</Link> &nbsp;/&nbsp; <Link href="/collection">COLLECTION</Link> &nbsp;/&nbsp; {product.name.toUpperCase()}
      </nav>

      <ProductConfigurator product={product} insoles={INSOLES} />

      {/* You may also like */}
      <section className="white-section" style={{ paddingBottom: 0 }} aria-labelledby="also-h">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">COMPLETE THE LOOK</span>
              <h2 className="display section-title" id="also-h">You may also like</h2>
            </div>
            <Link className="arrow-link" href="/collection">VIEW ALL 6 STYLES <ArrowRight /></Link>
          </div>
          <div className="product-grid">
            {alsoLike.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <div style={{ height: "var(--section-y)" }} />
      <PreorderBanner />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { formatIDR, type Product } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="img-wrap">
        <Image
          src={product.image}
          alt={`${product.name} — sepatu kulit ${product.color === "noir" ? "hitam" : "putih"}`}
          width={600} height={630} loading="lazy"
        />
      </div>
      <div className="info">
        <div className="name-row">
          <span className="name">{product.name}</span>
          <span className="price">{formatIDR(product.price)}</span>
        </div>
        <div className="meta-row">
          <span className="variant">{product.color === "noir" ? "NOIR" : "BIANCO"}</span>
          <span className="tag">PRE-ORDER</span>
        </div>
      </div>
    </Link>
  );
}

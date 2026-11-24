import Image from "next/image";
import type { Insole } from "@/lib/catalog";

export default function InsoleCard({ insole, withFeatures = true }: { insole: Insole; withFeatures?: boolean }) {
  return (
    <article className="insole-card">
      <Image src={insole.image} alt={`Insole ${insole.name}`} width={600} height={510} loading="lazy" />
      <div className="body">
        <div className="name-row">
          <span className="name">{insole.name}</span>
          <span className="price">{insole.priceLabel}</span>
        </div>
        <p className="desc">{insole.desc}</p>
        {withFeatures && (
          <ul>{insole.features.map((f) => <li key={f}>{f}</li>)}</ul>
        )}
      </div>
    </article>
  );
}

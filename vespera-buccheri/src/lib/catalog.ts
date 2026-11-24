// Sumber data katalog — MIGRASI KE SUPABASE TERAKHIR:
// ganti isi file ini dengan query ke tabel products/insoles/product_variants.
// Semua halaman membaca dari sini, jadi tidak ada perubahan di komponen.

export type Product = {
  slug: string;
  name: string;
  color: "noir" | "bianco";
  colorLabel: string;
  price: number;
  image: string;
  description: string;
  gallery: string[];
  details: { label: string; value: string }[];
};

export type Insole = {
  slug: string;
  name: string;
  role: string;
  price: number;
  priceLabel: string;
  desc: string;
  features: string[];
  image: string;
};

export const SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"] as const;
export const EXTRA_INSOLE_PRICE = 180_000;

// ponytail: harga/nama belum final per PRD §19 — data seed Supabase harus disamakan saat migrasi.
export const PRODUCTS: Product[] = [
  {
    slug: "vespera-alta",
    name: "Vespera Alta",
    color: "noir",
    colorLabel: "NOIR — FULL GRAIN LEATHER",
    price: 1_450_000,
    image: "/images/alta.jpg?v=3",
    description:
      "Siluet klasik dengan konstruksi modern. Upper full-grain leather, outsole ringan, dan sistem interchangeable insole — satu pasang untuk rapat pagi hingga malam akhir pekan.",
    gallery: ["/images/alta-1.jpg?v=2", "/images/alta-3.jpg?v=2", "/images/alta-2.jpg?v=2"],
    details: [
      { label: "Upper", value: "Full-grain calf leather, Noir." },
      { label: "Lining", value: "Soft goat leather lining dengan finishing burgundy." },
      { label: "Outsole", value: "Blake-stitched leather dengan lapisan rubber anti-slip." },
      { label: "Insole", value: "Interchangeable Vespera footbed system — Cloudwalk termasuk." },
    ],
  },
  {
    slug: "vespera-luce",
    name: "Vespera Luce",
    color: "bianco",
    colorLabel: "BIANCO — FULL GRAIN LEATHER",
    price: 1_250_000,
    image: "/images/luce.jpg?v=3",
    description: "Sneaker putih minimalis untuk tampilan ringan sepanjang hari.",
    gallery: ["/images/luce.jpg?v=3"],
    details: [{ label: "Upper", value: "Full-grain calf leather, Bianco." }],
  },
  {
    slug: "vespera-ombra",
    name: "Vespera Ombra",
    color: "noir",
    colorLabel: "NOIR — FULL GRAIN LEATHER",
    price: 1_150_000,
    image: "/images/ombra.jpg?v=4",
    description: "Low-profile hitam dengan detail jahitan tegas.",
    gallery: ["/images/alta-3.jpg?v=2", "/images/alta-1.jpg?v=2", "/images/alta-2.jpg?v=2"],
    details: [{ label: "Upper", value: "Full-grain calf leather, Noir." }],
  },
  {
    slug: "vespera-petra",
    name: "Vespera Petra",
    color: "bianco",
    colorLabel: "BIANCO — FULL GRAIN LEATHER",
    price: 1_350_000,
    image: "/images/petra.jpg?v=2",
    description: "Desain monokrom dengan bibisit metalik.",
    gallery: ["/images/petra.jpg?v=2"],
    details: [{ label: "Upper", value: "Full-grain calf leather, Bianco." }],
  },
  {
    slug: "vespera-notte",
    name: "Vespera Notte",
    color: "noir",
    colorLabel: "NOIR — FULL GRAIN LEATHER",
    price: 1_400_000,
    image: "/images/notte.jpg?v=2",
    description: "Hitam pekat dengan aksen metalik untuk malam.",
    gallery: ["/images/notte.jpg?v=2"],
    details: [{ label: "Upper", value: "Full-grain calf leather, Noir." }],
  },
  {
    slug: "vespera-aria",
    name: "Vespera Aria",
    color: "bianco",
    colorLabel: "BIANCO — FULL GRAIN LEATHER",
    price: 1_100_000,
    image: "/images/aria.jpg?v=2",
    description: "Siluet ringan untuk mobilitas tinggi.",
    gallery: ["/images/aria.jpg?v=2"],
    details: [{ label: "Upper", value: "Full-grain calf leather, Bianco." }],
  },
];

export const INSOLES: Insole[] = [
  {
    slug: "cloudwalk",
    name: "Cloudwalk",
    role: "01 — EVERYDAY COMFORT",
    price: 0,
    priceLabel: "INCLUDED",
    desc: "Everyday comfort. Memory-foam core untuk jalan seharian — commute, meeting, dan segala hal di antaranya.",
    features: ["Memory foam core", "Contoured arch support", "Breathable weave"],
    image: "/images/insole-cloudwalk.jpg?v=5",
  },
  {
    slug: "boardroom",
    name: "Boardroom",
    role: "02 — ALL-DAY STRUCTURE",
    price: 150_000,
    priceLabel: "+Rp 150.000",
    desc: "All-day structure. Posture-aligning base menjaga kaki tetap stabil saat berdiri dan berjalan sepanjang hari kerja.",
    features: ["Firm heel cup", "Posture-aligning base", "Full-grain leather top"],
    image: "/images/insole-boardroom.jpg?v=5",
  },
  {
    slug: "activeflex",
    name: "Activeflex",
    role: "03 — SPORT RECOVERY",
    price: 200_000,
    priceLabel: "+Rp 200.000",
    desc: "Sport recovery. High-energy return foam dan impact-absorbing gel mengembalikan energi setiap langkah — dan mempercepat pemulihan.",
    features: ["High-energy return foam", "Impact-absorbing gel", "Moisture-wicking layer"],
    image: "/images/insole-activeflex.jpg?v=5",
  },
];

export const formatIDR = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

// WhatsApp ordering (PRD FR-09) — wa.me dengan pesan terisi
export const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6282242053580"; // +62 822-4205-3580

export function buildWhatsAppLink(order: {
  productName: string;
  color: string;
  size: string | null;
  bundle: string;
  extraInsole: boolean;
  total: number;
}) {
  const msg =
    `Halo Vespera Buccheri! Saya ingin pre-order:\n\n` +
    `• Produk: ${order.productName} (${order.color})\n` +
    `• Ukuran: EU ${order.size}\n` +
    `• Insole bundle: ${order.bundle}` +
    (order.extraInsole ? `\n• Extra insole: +1` : "") +
    `\n• Total: ${formatIDR(order.total)}\n\nMohon info cara pembayaran (DP / full). Terima kasih!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

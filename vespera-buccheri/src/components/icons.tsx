// Ikon inline (lucide-style) — dipakai nav, footer, CTA
type P = { size?: number };
const s = (n: number) => ({ width: n, height: n, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 });

export const SearchIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const UserIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" /></svg>
);
export const BagIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
);
export const ArrowRight = ({ size = 14 }: P) => (
  <svg {...s(size)} strokeWidth={2}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
);
export const PlayIcon = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
export const ClockIcon = ({ size = 14 }: P) => (
  <svg {...s(size)} strokeWidth={2}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
);
export const WhatsAppIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 1 1-3.6 13l-.4-.2-2.7.7.7-2.6-.2-.4A7 7 0 0 1 12 5z" /></svg>
);
export const InstagramIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" /></svg>
);
export const YoutubeIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><rect x="2.5" y="6" width="19" height="13" rx="3" /><path d="m10.5 9.8 4.5 2.7-4.5 2.7z" fill="currentColor" /></svg>
);
export const TikTokIcon = ({ size = 18 }: P) => (
  <svg {...s(size)}><path d="M14 4v9.5a4 4 0 1 1-4-4" /><path d="M14 4c.5 2.5 2 4 5 4.5" /></svg>
);

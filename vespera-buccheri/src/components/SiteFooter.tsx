import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { InstagramIcon, YoutubeIcon, TikTokIcon } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="logo"><span className="vespera">VESPERA</span><span className="buccheri">BUCCHERI</span></div>
          <p className="tagline">Premium interchangeable footwear. Designed in Jakarta, worn everywhere.</p>
          <NewsletterForm />
          <div className="socials">
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
            <a href="#" aria-label="TikTok"><TikTokIcon /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li><Link href="/#story">Our Story</Link></li>
            <li><Link href="/innovation">Innovation</Link></li>
            <li><a href="https://wa.link/geypb3" target="_blank" rel="noopener noreferrer">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SHOP</h4>
          <ul>
            <li><Link href="/collection">The Collection</Link></li>
            <li><Link href="/innovation">Insoles &amp; Bundles</Link></li>
            <li><Link href="/collection">Pre-Order</Link></li>
            <li><Link href="/products/vespera-alta#size-guide">Size Guide</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SUPPORT</h4>
          <ul>
            <li><Link href="/products/vespera-alta#size-guide">Shipping &amp; Pre-Order</Link></li>
            <li><Link href="/products/vespera-alta#size-guide">Returns</Link></li>
            <li><a href="https://wa.link/geypb3" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="mailto:care@vespera.id">care@vespera.id</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Vespera Buccheri. All rights reserved.</span>
        <span>Jakarta, Indonesia</span>
      </div>
    </footer>
  );
}

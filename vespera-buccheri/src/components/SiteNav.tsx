"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchIcon, UserIcon, BagIcon } from "./icons";

const LINKS = [
  { href: "/collection", label: "COLLECTION", match: "/collection" },
  { href: "/#story", label: "OUR STORY", match: "story" },
  { href: "/innovation", label: "INNOVATION", match: "/innovation" },
];

export default function SiteNav({ currentPath = "" }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <div className="inner container">
        <Link href="/" className="logo" aria-label="Vespera Buccheri — beranda">
          <span className="vespera">VESPERA</span>
          <span className="buccheri">BUCCHERI</span>
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={currentPath === l.match ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-icons">
          <a href="#" aria-label="Cari"><SearchIcon /></a>
          <a href="#" aria-label="Akun"><UserIcon /></a>
          <a href="#" aria-label="Shopping bag"><BagIcon /></a>
        </div>
        <button
          className="nav-toggle"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

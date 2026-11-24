"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";

// Static versi — konfirmasi lokal saja. Wire ke Supabase/Resend di fase integrasi.
export default function NewsletterForm() {
  const [note, setNote] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNote("Mohon masukkan email yang valid.");
      return;
    }
    setNote("Terima kasih — Anda masuk daftar early access Batch 01.");
    e.currentTarget.reset();
  };
  return (
    <div>
      <p className="newsletter-label">JOIN THE LIST — EARLY ACCESS TO BATCH 01</p>
      <form className="newsletter-form" onSubmit={onSubmit} noValidate>
        <input type="email" name="email" placeholder="Your email address" aria-label="Alamat email" required />
        <button type="submit" aria-label="Kirim email"><ArrowRight size={16} /></button>
      </form>
      <p className="note" role="status">{note}</p>
    </div>
  );
}

// Vespera Buccheri — static site behavior. No dependencies.
// TODO(user): ganti nomor WhatsApp berikut dengan nomor resmi Vespera.
const WA_NUMBER = "6281234567890";

// Mobile nav
document.querySelector(".nav-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});

// Reveal on scroll (PRD §11.5: fade-in saat section masuk viewport)
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Newsletter (static site — tidak ada backend; tampilkan konfirmasi lokal)
document.querySelectorAll(".newsletter-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input[type=email]").value.trim();
    const note = form.parentElement.querySelector(".note");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { note.textContent = "Mohon masukkan email yang valid."; return; }
    note.textContent = "Terima kasih — Anda masuk daftar early access Batch 01.";
    form.reset();
  });
});

// Collection filter (US-04: filter warna)
const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
if (filterBtns.length) {
  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll("[data-color]").forEach((card) => {
        card.style.display = f === "all" || card.dataset.color === f ? "" : "none";
      });
    })
  );
}

// Product detail configurator (FR-03/FR-04 versi statis → WhatsApp)
const pd = document.querySelector("[data-product]");
if (pd) {
  const state = { color: "Noir", size: null, bundle: "Cloudwalk", base: +pd.dataset.price, add: 0 };
  const priceEl = document.getElementById("pd-price");
  const priceBtn = document.getElementById("pd-add");

  const total = () => state.base + (state.bundle === "Boardroom" ? 150000 : state.bundle === "Activeflex" ? 200000 : 0) + state.add;
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");
  const render = () => { priceEl.textContent = fmt(total()); priceBtn.querySelector("span").textContent = "ADD TO CART — " + fmt(total()); };

  pd.querySelectorAll(".swatch").forEach((s) =>
    s.addEventListener("click", () => {
      pd.querySelectorAll(".swatch").forEach((x) => x.classList.remove("active"));
      s.classList.add("active");
      state.color = s.dataset.name;
    })
  );
  pd.querySelectorAll(".size-btn").forEach((s) =>
    s.addEventListener("click", () => {
      pd.querySelectorAll(".size-btn").forEach((x) => x.classList.remove("active"));
      s.classList.add("active");
      state.size = s.dataset.size;
    })
  );
  pd.querySelectorAll(".bundle-option").forEach((b) =>
    b.addEventListener("click", () => {
      pd.querySelectorAll(".bundle-option").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.bundle = b.dataset.name;
      render();
    })
  );
  document.getElementById("pd-extra")?.addEventListener("click", (e) => {
    e.preventDefault();
    state.add = state.add ? 0 : 180000;
    e.target.textContent = state.add ? "✓ EXTRA INSOLE DITAMBAHKAN — " + fmt(180000) + " (klik untuk hapus)" : "+ ADD EXTRA INSOLE — Rp 180.000";
    render();
  });

  // Gallery
  pd.querySelectorAll(".pd-thumbs button").forEach((t) =>
    t.addEventListener("click", () => {
      pd.querySelectorAll(".pd-thumbs button").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      pd.querySelector(".pd-main-img img").src = t.dataset.src;
    })
  );

  // WhatsApp ordering (FR-09: wa.me dengan pesan terisi)
  const waLink = () => {
    if (!state.size) return alert("Mohon pilih ukuran terlebih dahulu."), null;
    const msg =
      `Halo Vespera Buccheri! Saya ingin pre-order:\n\n` +
      `• Produk: ${pd.dataset.product} (${state.color})\n` +
      `• Ukuran: EU ${state.size}\n` +
      `• Insole bundle: ${state.bundle}` +
      (state.add ? `\n• Extra insole: +1` : "") +
      `\n• Total: ${fmt(total())}\n\nMohon info cara pembayaran (DP / full). Terima kasih!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };
  priceBtn.addEventListener("click", () => { const u = waLink(); u && (location.href = u); });
  document.getElementById("pd-wa").addEventListener("click", () => { const u = waLink(); u && (location.href = u); });
  render();
}

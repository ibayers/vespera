-- Seed data Vespera — produk & insole dari fase static site (harga belum final per PRD §19)
insert into products (name, slug, description, base_price, material, status) values
  ('Vespera Alta', 'vespera-alta', 'Siluet klasik dengan konstruksi modern. Upper full-grain leather, outsole ringan, interchangeable insole system.', 1450000, 'Full-grain calf leather', 'active'),
  ('Vespera Luce', 'vespera-luce', 'Sneaker putih minimalis untuk tampilan ringan sepanjang hari.', 1250000, 'Full-grain calf leather', 'active'),
  ('Vespera Ombra', 'vespera-ombra', 'Low-profile hitam dengan detail jahitan tegas.', 1150000, 'Full-grain calf leather', 'active'),
  ('Vespera Petra', 'vespera-petra', 'Desain monokrom dengan bibisit metalik.', 1350000, 'Full-grain calf leather', 'active'),
  ('Vespera Notte', 'vespera-notte', 'Hitam pekat dengan aksen metalik untuk malam.', 1400000, 'Full-grain calf leather', 'active'),
  ('Vespera Aria', 'vespera-aria', 'Siluet ringan untuk mobilitas tinggi.', 1100000, 'Full-grain calf leather', 'active');

-- Varian: 2 warna × EU 36–45 per produk
insert into product_variants (product_id, color, size, sku, price_adjustment, stock_quantity)
select p.id, c.color, s.size,
       replace(p.slug, '-', '_') || '-' || left(lower(c.color), 3) || '-' || s.size,
       0, 0
from products p
cross join (values ('Noir'), ('Bianco')) as c(color)
cross join (values ('36'),('37'),('38'),('39'),('40'),('41'),('42'),('43'),('44'),('45')) as s(size);

insert into insoles (name, slug, description, features, price, status) values
  ('Cloudwalk', 'cloudwalk', 'Everyday comfort. Memory-foam core untuk jalan seharian.',
   '["Memory foam core","Contoured arch support","Breathable weave"]', 0, 'active'),
  ('Boardroom', 'boardroom', 'All-day structure. Posture-aligning base untuk kerja dan acara formal.',
   '["Firm heel cup","Posture-aligning base","Full-grain leather top"]', 150000, 'active'),
  ('Activeflex', 'activeflex', 'Sport recovery. High-energy return untuk hari paling aktif.',
   '["High-energy return foam","Impact-absorbing gel","Moisture-wicking layer"]', 200000, 'active');

-- Campaign Batch 01 (draft — admin yang membuka via dashboard)
insert into preorder_campaigns (name, start_at, end_at, quota, estimated_production_date, estimated_shipping_date, status)
values ('Batch 01 — 2026', now() + interval '7 days', now() + interval '28 days', 300, current_date + 56, current_date + 70, 'draft');

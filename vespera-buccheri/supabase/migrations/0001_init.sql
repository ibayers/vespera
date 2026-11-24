-- Vespera Buccheri — initial schema (PRD §9)
-- UUID PK, NUMERIC money, price snapshots on order items, FK integrity.

create extension if not exists "uuid-ossp";

-- Enums
create type user_role as enum ('customer', 'admin', 'super_admin');
create type product_status as enum ('draft', 'active', 'archived');
create type insole_status as enum ('active', 'inactive');
create type campaign_status as enum ('draft', 'scheduled', 'open', 'closed', 'completed');
create type order_source as enum ('website', 'whatsapp');
create type payment_method as enum ('dp', 'full');
create type order_status as enum ('order_placed', 'payment', 'processing', 'production', 'quality_control', 'ready_to_ship', 'shipped', 'completed', 'cancelled', 'refunded');
create type payment_status as enum ('unpaid', 'pending', 'partially_paid', 'paid', 'failed', 'expired', 'refunded');
create type payment_type as enum ('dp', 'full', 'settlement', 'refund');
create type payment_txn_status as enum ('pending', 'paid', 'failed', 'expired', 'refunded');
create type media_type as enum ('image', 'video');
create type video_category as enum ('hero', 'product', 'brand', 'insole');
create type content_type as enum ('page', 'article');
create type shipping_status as enum ('preparing', 'shipped', 'in_transit', 'delivered', 'returned');

-- A. profiles
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role user_role not null default 'customer',
  created_at timestamptz not null default now()
);

-- B. products
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  base_price numeric(12,2) not null check (base_price >= 0),
  material text,
  status product_status not null default 'draft',
  created_at timestamptz not null default now()
);

-- C. product_variants
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products (id) on delete cascade,
  color text not null,
  size text not null,
  sku text not null unique,
  price_adjustment numeric(12,2) not null default 0,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default true,
  unique (product_id, color, size)
);

-- D. insoles
create table insoles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  features jsonb not null default '[]',
  image_url text,
  price numeric(12,2) not null default 0 check (price >= 0),
  status insole_status not null default 'active'
);

-- E. product_bundles
create table product_bundles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  product_id uuid not null references products (id) on delete cascade,
  price numeric(12,2) not null check (price >= 0),
  description text,
  is_active boolean not null default true
);

-- F. bundle_items
create table bundle_items (
  id uuid primary key default uuid_generate_v4(),
  bundle_id uuid not null references product_bundles (id) on delete cascade,
  insole_id uuid not null references insoles (id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  unique (bundle_id, insole_id)
);

-- G. product_media
create table product_media (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products (id) on delete cascade,
  media_type media_type not null default 'image',
  media_url text not null,
  thumbnail_url text,
  sort_order integer not null default 0,
  is_primary boolean not null default false
);

-- H. preorder_campaigns
create table preorder_campaigns (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  start_at timestamptz,
  end_at timestamptz,
  quota integer check (quota is null or quota > 0),
  reserved_quantity integer not null default 0,
  estimated_production_date date,
  estimated_shipping_date date,
  status campaign_status not null default 'draft',
  constraint campaign_dates check (end_at is null or start_at is null or end_at > start_at),
  constraint quota_reserved check (quota is null or reserved_quantity <= quota)
);

-- I. orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  user_id uuid references profiles (id) on delete set null,
  campaign_id uuid references preorder_campaigns (id) on delete set null,
  source order_source not null default 'website',
  subtotal numeric(12,2) not null default 0,
  shipping_fee numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  payment_method payment_method,
  dp_amount numeric(12,2),
  paid_amount numeric(12,2) not null default 0,
  remaining_amount numeric(12,2) not null default 0,
  order_status order_status not null default 'order_placed',
  payment_status payment_status not null default 'unpaid',
  created_at timestamptz not null default now()
);

-- J. order_items (price snapshots per PRD §9.3)
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid references products (id) on delete set null,
  variant_id uuid references product_variants (id) on delete set null,
  bundle_id uuid references product_bundles (id) on delete set null,
  product_name_snapshot text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null default 1 check (quantity > 0),
  item_total numeric(12,2) not null
);

-- K. order_item_insoles
create table order_item_insoles (
  id uuid primary key default uuid_generate_v4(),
  order_item_id uuid not null references order_items (id) on delete cascade,
  insole_id uuid references insoles (id) on delete set null,
  insole_name_snapshot text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null default 1 check (quantity > 0)
);

-- L. payments
create table payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders (id) on delete cascade,
  payment_type payment_type not null,
  provider text,
  provider_reference text unique,
  amount numeric(12,2) not null check (amount >= 0),
  status payment_txn_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- M. shipments
create table shipments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders (id) on delete cascade,
  courier text,
  tracking_number text,
  shipping_status shipping_status not null default 'preparing',
  shipped_at timestamptz,
  delivered_at timestamptz
);

-- N. order_status_history (audit per PRD §9.3)
create table order_status_history (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders (id) on delete cascade,
  old_status text,
  new_status text not null,
  note text,
  changed_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- O. addresses
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles (id) on delete cascade,
  recipient_name text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  province text not null,
  postal_code text not null,
  is_default boolean not null default false
);

-- P. content
create table content (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content_type content_type not null default 'page',
  body jsonb not null default '{}',
  thumbnail_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz
);

-- Q. media_assets
create table media_assets (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  media_type media_type not null default 'video',
  category video_category,
  media_url text not null,
  poster_url text,
  duration integer,
  placement text,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

-- Indexes for hot paths
create index idx_variants_product on product_variants (product_id);
create index idx_orders_user on orders (user_id);
create index idx_orders_campaign on orders (campaign_id);
create index idx_order_items_order on order_items (order_id);
create index idx_payments_order on payments (order_id);
create index idx_payments_reference on payments (provider_reference);
create index idx_media_product on product_media (product_id);

-- Row Level Security (PRD §13.2)
alter table profiles enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table insoles enable row level security;
alter table product_bundles enable row level security;
alter table bundle_items enable row level security;
alter table product_media enable row level security;
alter table preorder_campaigns enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table order_item_insoles enable row level security;
alter table payments enable row level security;
alter table shipments enable row level security;
alter table order_status_history enable row level security;
alter table addresses enable row level security;
alter table content enable row level security;
alter table media_assets enable row level security;

-- Helper: is admin/super_admin
create function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'super_admin'));
$$;

-- Public catalog: readable by everyone, writable by admin
create policy "catalog read" on products for select using (status = 'active' or public.is_admin());
create policy "catalog admin write" on products for all using (public.is_admin()) with check (public.is_admin());
create policy "variants read" on product_variants for select using (public.is_admin() or exists (select 1 from products p where p.id = product_id and p.status = 'active'));
create policy "variants admin write" on product_variants for all using (public.is_admin()) with check (public.is_admin());
create policy "insoles read" on insoles for select using (status = 'active' or public.is_admin());
create policy "insoles admin write" on insoles for all using (public.is_admin()) with check (public.is_admin());
create policy "bundles read" on product_bundles for select using (is_active or public.is_admin());
create policy "bundles admin write" on product_bundles for all using (public.is_admin()) with check (public.is_admin());
create policy "bundle items read" on bundle_items for select using (true);
create policy "bundle items admin write" on bundle_items for all using (public.is_admin()) with check (public.is_admin());
create policy "product media read" on product_media for select using (true);
create policy "product media admin write" on product_media for all using (public.is_admin()) with check (public.is_admin());
create policy "campaigns read" on preorder_campaigns for select using (status in ('open', 'scheduled') or public.is_admin());
create policy "campaigns admin write" on preorder_campaigns for all using (public.is_admin()) with check (public.is_admin());
create policy "content read" on content for select using (status = 'published' or public.is_admin());
create policy "content admin write" on content for all using (public.is_admin()) with check (public.is_admin());
create policy "media read" on media_assets for select using (is_active or public.is_admin());
create policy "media admin write" on media_assets for all using (public.is_admin()) with check (public.is_admin());

-- Own-profile only (PRD FR-14)
create policy "own profile" on profiles for select using (auth.uid() = id or public.is_admin());
create policy "own profile update" on profiles for update using (auth.uid() = id or public.is_admin()) with check (auth.uid() = id or public.is_admin());
create policy "own addresses" on addresses for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

-- Orders: customer sees own; admin sees all; inserts authenticated; no customer update/delete
create policy "own orders read" on orders for select using (auth.uid() = user_id or public.is_admin());
create policy "orders insert" on orders for insert with check (auth.uid() = user_id or public.is_admin());
create policy "orders admin update" on orders for update using (public.is_admin()) with check (public.is_admin());
create policy "order items read" on order_items for select using (public.is_admin() or exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "order items insert" on order_items for insert with check (public.is_admin() or exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "order item insoles read" on order_item_insoles for select using (public.is_admin() or exists (select 1 from order_items oi join orders o on o.id = oi.order_id where oi.id = order_item_id and o.user_id = auth.uid()));
create policy "order item insoles insert" on order_item_insoles for insert with check (public.is_admin() or exists (select 1 from order_items oi join orders o on o.id = oi.order_id where oi.id = order_item_id and o.user_id = auth.uid()));

-- Payments: never readable by customer directly (amount via own order); admin full. Webhook inserts via service role (bypasses RLS).
create policy "payments admin" on payments for all using (public.is_admin()) with check (public.is_admin());
create policy "shipments admin" on shipments for all using (public.is_admin()) with check (public.is_admin());
create policy "shipments customer read" on shipments for select using (public.is_admin() or exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "history admin" on order_status_history for all using (public.is_admin()) with check (public.is_admin());
create policy "history customer read" on order_status_history for select using (public.is_admin() or exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));

-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

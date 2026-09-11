-- Produits, alimentes par le stock ForceLog
--
-- `ref` est le code article ForceLog (ex. "180ZEI") : c'est la cle qui
-- relie un produit a son stock chez le transporteur, et celle qu'on
-- transmet dans le champ STOCK d'un colis de stock.

create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  ref              text not null unique,
  name             text not null,
  product_name     text,
  barcode          text,
  quantity         integer not null default 0,
  waiting_quantity integer not null default 0,
  image            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists products_ref_idx on public.products (ref);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Meme regle que pour `leads` : RLS active sans policy, donc aucun acces
-- direct depuis le navigateur. Tout passe par les routes serveur.
alter table public.products enable row level security;

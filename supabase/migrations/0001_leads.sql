-- Lead2Door — table "leads" (phase 2)
--
-- Colonnes calquees sur le type `Lead` de src/components/dashboard/leads-data.ts
-- pour que la migration ne change rien a l'affichage existant :
--   - `amount` / `tarif` restent du texte ("500 MAD"), comme dans l'app.
--   - `date` reste le libelle affiche ; `created_at` sert au tri reel.
--   - `status` est du texte libre : les statuts sont configurables depuis
--     la page Parametres, un enum Postgres serait trop rigide.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  reference       text not null,
  product_label   text,
  product_name    text,
  item_count      integer,
  client          text not null,
  phone           text not null,
  source          text,
  assigned_to     text,
  amount          text,
  status          text not null default 'Nouveau',
  shipping        text default 'En attente',
  date            text,
  ville           text,
  tarif           text,
  quartier        text,
  adresse         text,
  tracking_number text,
  tracking_error  text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- `updated_at` maintenu automatiquement a chaque modification.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- Securite : RLS activee SANS policy => aucun acces direct depuis le
-- navigateur avec la publishable key. Seules les routes API de l'app,
-- qui utilisent la secret key cote serveur, contournent la RLS.
-- Quand l'authentification sera en place, on ajoutera ici des policies
-- par role plutot que d'ouvrir l'acces au navigateur.
alter table public.leads enable row level security;

-- Donnees de demarrage : les commandes de demonstration actuelles.
insert into public.leads
  (reference, product_label, product_name, item_count, client, phone, source,
   assigned_to, amount, status, shipping, date, ville, tarif, quartier, adresse)
values
  ('spc-1003', 'SAC', 'SAC LO', 2, 'soufiane imil', '0660164362', 'Agent Manual',
   'Imane Lahlou', '500 MAD', 'Assigne', 'En attente', '19 aout 2026, 21:59',
   'Oujda', '48 MAD', 'Maarif', '11 Rue Example'),
  ('spc-1002', 'DIF', 'Diffuseur Atlas Zen', null, 'soufiane imil', '0660164361', 'Direct',
   'soufiane imil', '200 MAD', 'Nouveau', 'En attente', '19 aout 2026, 21:59',
   null, null, null, null),
  ('spc-1001', 'DIF', 'Diffuseur Atlas Zen', null, 'soufiane imil', '0660164360', 'Landing page',
   'soufiane imil', '200 MAD', 'Nouveau', 'En attente', '19 aout 2026, 21:59',
   'Sale', '38 MAD', null, null),
  ('MO-E8HQ7-0811', 'BOIS', 'Sac Cuir Marrakech', null, 'ayoub', '0622161711', 'Lightfunnels',
   'Youssef Idrissi', '249 MAD', 'Confirme', 'En attente', '21 aout 2026, 22:39',
   'Meknes', '42 MAD', null, null),
  ('MO-MX7NC-0802', 'BOIS', 'Bracelet Atlas Silver', 2, 'Yassin', '0630053131', 'Landing page',
   'Fatima Zahra', '279 MAD', 'Rappel', 'En attente', '20 aout 2026, 19:14',
   'Tanger', null, null, null),
  ('MO-DWZW8-0728', 'SAC', 'SAC LO', null, 'achraf', '0666686869', 'Agent Manual',
   'Fatima Zahra', '837 MAD', 'Annule', 'En attente', '23 juil. 2026, 22:39',
   null, null, null, null),
  ('MO-EES7K-0728', 'SAC', 'Serum Derma Glow', null, 'samba', '0623145234', 'nouveau',
   'Fatima Zahra', '558 MAD', 'A revoir', 'En attente', '28 juil. 2026, 08:40',
   null, null, null, null),
  ('MO-QX21S-0705', 'WATCH', 'Montre Pro X V2', null, 'hicham inconnu', '0611223344', 'Direct',
   'Karim El Mansouri', '799 MAD', 'Faux / spam', 'En attente', '5 juil. 2026, 10:12',
   null, null, null, null);

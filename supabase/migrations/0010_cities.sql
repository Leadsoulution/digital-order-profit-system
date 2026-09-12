-- Dictionnaire des villes canoniques
--
-- Les villes arrivent ecrites de dix facons differentes selon la source
-- (saisie agent, import Excel, formulaire web) : "Beni Mellal",
-- "beni-mellal", "BENI MELAL". Cette table fixe une forme canonique par
-- ville, la cle, et rattache les variantes rencontrees en alias, pour que
-- la normalisation a la capture et a l'import donne toujours le meme
-- resultat.
--
-- Le tarif de livraison a trois origines possibles, gardees explicites
-- parce qu'elles ne se valent pas :
--   - "transporteur" : le tarif remonte tel quel de ForceLog
--   - "canonique"    : le tarif de reference decide en interne
--   - "force"        : un prix impose pour cette ville, qui l'emporte
--
-- Comme le reste du schema, RLS active sans policy : tout passe par les
-- routes serveur.

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  aliases text[] not null default '{}',
  -- Code ForceLog, quand la ville vient d'un import transporteur.
  carrier_code text,
  tariff numeric(10, 2) not null default 0,
  tariff_source text not null default 'canonique'
    check (tariff_source in ('canonique', 'transporteur', 'force')),
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.cities enable row level security;

create index if not exists cities_name_idx on public.cities (name);

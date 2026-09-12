-- Comptes utilisateurs
--
-- L'authentification est deleguee a Supabase Auth : les mots de passe
-- vivent dans `auth.users`, jamais ici. Cette table porte tout ce que la
-- page Utilisateurs affiche en plus, et se supprime avec le compte.
--
-- Comme le reste du schema, RLS est active sans aucune policy : le
-- navigateur ne peut donc rien lire ni ecrire directement, tout passe par
-- les routes serveur qui utilisent la cle secrete.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  phone text,
  role text not null default 'Agent',
  status text not null default 'Actif',
  -- Trois interrupteurs affiches sur la fiche utilisateur.
  suivi_livraison boolean not null default true,
  imports_excel boolean not null default false,
  creation_prospects boolean not null default false,
  avatar_color text not null default 'bg-blue-600',
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create index if not exists profiles_email_idx on public.profiles (email);

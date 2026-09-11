-- Type de colis ForceLog
--
-- ForceLog distingue deux types d'expedition :
--   - 'simple' : la marchandise part de notre propre depot (defaut)
--   - 'stock'  : la marchandise est deja stockee chez ForceLog, on
--                indique alors quelles references prelever
--
-- `stock_items` conserve la selection au format attendu par AddParcel,
-- soit "ref:quantite,ref:quantite".

alter table public.leads
  add column if not exists parcel_type text not null default 'simple',
  add column if not exists stock_items text;

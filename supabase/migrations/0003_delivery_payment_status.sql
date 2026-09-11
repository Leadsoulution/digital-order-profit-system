-- Statuts de livraison et de paiement remontes de ForceLog
--
-- Trois colonnes alimentees par la synchronisation ForceLog :
--   - delivery_status      : libelle affichable, ex. "En cours de livraison"
--   - delivery_status_code : code machine, ex. "DISTRIBUTION" (sert au style)
--   - payment_status       : champ SITUATION de ForceLog, ex. "Non Paye"
--
-- Elles restent nulles tant que la commande n'a pas ete envoyee chez le
-- transporteur.

alter table public.leads
  add column if not exists delivery_status text,
  add column if not exists delivery_status_code text,
  add column if not exists payment_status text,
  add column if not exists last_synced_at timestamptz;

create index if not exists leads_tracking_number_idx
  on public.leads (tracking_number)
  where tracking_number is not null;

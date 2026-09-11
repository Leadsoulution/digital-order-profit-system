-- Livreur et date de livraison
--
-- L'API ForceLog ne communique ni le livreur ni la date de livraison :
-- GetParcels ne renvoie que le statut, et GetTracking refuse les numeros
-- de suivi. Ces trois colonnes appartiennent donc a l'application : elles
-- sont renseignees a la main depuis la commande, ou par le webhook si
-- ForceLog finit par transmettre ces informations.
--
--   - deliverer       : nom du livreur
--   - deliverer_phone : son telephone, pour les boutons appel et WhatsApp
--   - delivery_date   : date de livraison, texte au format "AAAA-MM-JJ HH:MM"
--                       comme les autres dates ForceLog de la table

alter table public.leads
  add column if not exists deliverer text,
  add column if not exists deliverer_phone text,
  add column if not exists delivery_date text;

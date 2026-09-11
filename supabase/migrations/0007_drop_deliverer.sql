-- Retrait des colonnes livreur
--
-- La colonne Livreur a ete retiree de l'interface : ForceLog ne
-- communique pas cette information (ni GetParcels ni GetTracking), et la
-- saisir a la main pour chaque commande n'avait pas d'interet.
--
-- `delivery_date` reste : elle est desormais horodatee automatiquement au
-- passage du colis a "Livre".
--
-- Ces deux colonnes n'ont jamais contenu de donnees.

alter table public.leads
  drop column if exists deliverer,
  drop column if exists deliverer_phone;

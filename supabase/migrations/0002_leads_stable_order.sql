-- Ordre d'affichage stable des commandes
--
-- Les 8 lignes de demarrage ont ete inserees dans une seule transaction :
-- `now()` renvoie l'heure de debut de transaction, elles partagent donc
-- toutes le meme `created_at`. Avec une cle de tri identique, Postgres
-- renvoie les lignes dans un ordre arbitraire, et une ligne modifiee
-- (reecrite en fin de table par le MVCC) se retrouvait affichee en
-- dernier.
--
-- On attribue ici un horodatage distinct a chaque commande, en respectant
-- l'ordre d'affichage d'origine, et la requete de lecture departage les
-- eventuelles egalites par `id`.

update public.leads set created_at = timestamptz '2026-08-25 12:00:08+00' where reference = 'spc-1003';
update public.leads set created_at = timestamptz '2026-08-25 12:00:07+00' where reference = 'spc-1002';
update public.leads set created_at = timestamptz '2026-08-25 12:00:06+00' where reference = 'spc-1001';
update public.leads set created_at = timestamptz '2026-08-25 12:00:05+00' where reference = 'MO-E8HQ7-0811';
update public.leads set created_at = timestamptz '2026-08-25 12:00:04+00' where reference = 'MO-MX7NC-0802';
update public.leads set created_at = timestamptz '2026-08-25 12:00:03+00' where reference = 'MO-DWZW8-0728';
update public.leads set created_at = timestamptz '2026-08-25 12:00:02+00' where reference = 'MO-EES7K-0728';
update public.leads set created_at = timestamptz '2026-08-25 12:00:01+00' where reference = 'MO-QX21S-0705';

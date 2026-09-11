import { addParcel, getRecentParcelStatuses } from "./client";
import { mapOrderToParcel } from "./mapping";
import { ForceLogApiError } from "./types";
import type { Lead } from "@/components/dashboard/leads-data";

/** Statut a partir duquel une commande part automatiquement chez ForceLog. */
export const AUTO_DISPATCH_STATUS = "Confirme";

/**
 * Envoie une commande chez ForceLog et renvoie les champs de suivi a
 * enregistrer. N'echoue jamais : une erreur ForceLog est retournee dans
 * `trackingError` pour etre affichee dans la colonne Code suivi, afin
 * qu'un probleme transporteur ne bloque pas le changement de statut.
 */
export async function dispatchToForceLog(
  lead: Pick<
    Lead,
    | "reference"
    | "client"
    | "phone"
    | "ville"
    | "adresse"
    | "amount"
    | "productName"
    | "parcelType"
    | "stockItems"
  >
): Promise<Partial<Lead>> {
  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return { trackingError: "Cle API ForceLog non configuree." };
  }

  try {
    const parcel = await addParcel(apiKey, mapOrderToParcel(lead));
    return {
      trackingNumber: parcel.TRACKING_NUMBER,
      trackingError: undefined,
      deliveryStatus: parcel.STATUS ?? "Nouveau colis",
      deliveryStatusCode: parcel.STATUS_CODE ?? "NEW_PARCEL",
      paymentStatus: parcel.SITUATION ?? "Non Paye",
    };
  } catch (error) {
    return {
      trackingError:
        error instanceof ForceLogApiError
          ? error.message
          : "Erreur inattendue lors de la creation du colis.",
    };
  }
}

/**
 * Recupere les statuts ForceLog des colis recents et renvoie, pour chaque
 * commande suivie, les changements a enregistrer.
 *
 * Rappel de la contrainte API : ForceLog ignore ses propres filtres et ne
 * renvoie que les 20 colis les plus recents, donc seules les commandes
 * presentes dans ce lot peuvent etre rafraichies.
 */
export async function collectStatusUpdates(
  leads: Lead[]
): Promise<{ updates: Map<string, Partial<Lead>>; checked: number; error?: string }> {
  const tracked = leads.filter((l) => l.trackingNumber);
  if (tracked.length === 0) return { updates: new Map(), checked: 0 };

  const apiKey = process.env.FORCELOG_API_KEY;
  if (!apiKey) {
    return { updates: new Map(), checked: 0, error: "Cle API ForceLog non configuree." };
  }

  let statuses: Awaited<ReturnType<typeof getRecentParcelStatuses>>;
  try {
    statuses = await getRecentParcelStatuses(apiKey);
  } catch (error) {
    return {
      updates: new Map(),
      checked: 0,
      error:
        error instanceof ForceLogApiError
          ? error.message
          : "Erreur inattendue lors de la synchronisation.",
    };
  }

  const updates = new Map<string, Partial<Lead>>();
  for (const lead of tracked) {
    const remote = statuses.get(lead.trackingNumber!);
    if (!remote) continue;
    // N'ecrit que si quelque chose a reellement change.
    if (
      remote.status === lead.deliveryStatus &&
      remote.statusCode === lead.deliveryStatusCode &&
      remote.situation === lead.paymentStatus
    ) {
      continue;
    }
    updates.set(lead.id, {
      deliveryStatus: remote.status,
      deliveryStatusCode: remote.statusCode,
      paymentStatus: remote.situation,
    });
  }

  return { updates, checked: tracked.length };
}

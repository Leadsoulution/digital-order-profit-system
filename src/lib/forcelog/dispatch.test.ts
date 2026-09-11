import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { collectStatusUpdates } from "./dispatch";
import type { Lead } from "@/components/dashboard/leads-data";

const AUTH_OK = { RESULT: "SUCCESS", MESSAGE: "Customer Authenticated" };

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead-1",
    reference: "MO-1",
    productLabel: "",
    productName: "",
    client: "Client",
    phone: "0600000000",
    source: "ForceLog",
    assignedTo: "",
    amount: "170 MAD",
    status: "Confirme",
    shipping: "En attente",
    date: "",
    trackingNumber: "F-AAA",
    ...overrides,
  };
}

function parcelsResponse(parcels: unknown[]) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      AUTH: AUTH_OK,
      "GET-PARCELS": { RESULT: "SUCCESS", PARCELS: parcels },
    }),
  } as Response;
}

describe("collectStatusUpdates", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("FORCELOG_API_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("updates delivery and payment status", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      parcelsResponse([
        {
          TRACKING_NUMBER: "F-AAA",
          STATUS: "Livre",
          STATUS_CODE: "DELIVERED",
          SITUATION: "Facture",
        },
      ])
    );

    const { updates } = await collectStatusUpdates([lead()]);
    expect(updates.get("lead-1")).toEqual({
      deliveryStatus: "Livre",
      deliveryStatusCode: "DELIVERED",
      paymentStatus: "Facture",
    });
  });

  // Le statut de confirmation appartient a l'equipe de confirmation : un
  // colis annule, refuse ou retourne par le transporteur ne doit pas
  // rouvrir ni annuler la commande cote application.
  it.each([
    ["CANCELED", "Annule"],
    ["REFUSE", "Refuse"],
    ["RETURNED", "Retourne"],
    ["NO_ANSWER", "Pas de reponse"],
  ])("never touches the confirmation status (%s)", async (code, label) => {
    vi.mocked(fetch).mockResolvedValueOnce(
      parcelsResponse([
        {
          TRACKING_NUMBER: "F-AAA",
          STATUS: label,
          STATUS_CODE: code,
          SITUATION: "Non Paye",
        },
      ])
    );

    const { updates } = await collectStatusUpdates([lead({ status: "Confirme" })]);
    const changes = updates.get("lead-1")!;
    expect(changes).not.toHaveProperty("status");
    expect(Object.keys(changes).sort()).toEqual([
      "deliveryStatus",
      "deliveryStatusCode",
      "paymentStatus",
    ]);
  });

  it("skips orders whose statuses are already up to date", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      parcelsResponse([
        {
          TRACKING_NUMBER: "F-AAA",
          STATUS: "Livre",
          STATUS_CODE: "DELIVERED",
          SITUATION: "Facture",
        },
      ])
    );

    const { updates } = await collectStatusUpdates([
      lead({
        deliveryStatus: "Livre",
        deliveryStatusCode: "DELIVERED",
        paymentStatus: "Facture",
      }),
    ]);
    expect(updates.size).toBe(0);
  });

  it("ignores orders that were never dispatched", async () => {
    const { updates, checked } = await collectStatusUpdates([
      lead({ trackingNumber: undefined }),
    ]);
    expect(checked).toBe(0);
    expect(updates.size).toBe(0);
    expect(fetch).not.toHaveBeenCalled();
  });
});

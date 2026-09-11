import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  addParcel,
  checkHealth,
  getCities,
  getRecentParcelStatuses,
  getTracking,
} from "./client";
import { ForceLogApiError } from "./types";

const API_KEY = "test-key";
const AUTH_OK = { RESULT: "SUCCESS", MESSAGE: "Customer Authenticated" };

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("forcelog client", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("checkHealth", () => {
    it("returns true when the health endpoint answers healthy", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        jsonResponse({ status: "healthy", timestamp: 123 })
      );
      await expect(checkHealth(API_KEY)).resolves.toBe(true);

      const [url, init] = vi.mocked(fetch).mock.calls[0];
      expect(String(url)).toBe("https://api.forcelog.ma/health");
      expect((init?.headers as Record<string, string>)["X-API-Key"]).toBe(
        API_KEY
      );
    });

    it("returns false when the network call throws", async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error("network down"));
      await expect(checkHealth(API_KEY)).resolves.toBe(false);
    });

    it("returns false on a non-2xx HTTP status", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({}, 401));
      await expect(checkHealth(API_KEY)).resolves.toBe(false);
    });
  });

  describe("AUTH failure (invalid API key)", () => {
    it("throws with the AUTH block's MESSAGE", async () => {
      vi.mocked(fetch).mockResolvedValue(
        jsonResponse({
          AUTH: { RESULT: "ERROR", MESSAGE: "Cle API invalide" },
        })
      );
      await expect(getCities(API_KEY)).rejects.toThrow(ForceLogApiError);
      await expect(getCities(API_KEY)).rejects.toThrow("Cle API invalide");
    });
  });

  describe("business-error handling (HTTP 200 + nested RESULT: ERROR)", () => {
    it("throws a ForceLogApiError carrying the operation's MESSAGE", async () => {
      vi.mocked(fetch).mockResolvedValue(
        jsonResponse({
          AUTH: AUTH_OK,
          "GET-PARCELS": { RESULT: "ERROR", MESSAGE: "Parcel introuvable" },
        })
      );
      await expect(getTracking(API_KEY, "X")).rejects.toThrow(
        "Parcel introuvable"
      );
    });

    it("falls back to a generic message when MESSAGE is missing", async () => {
      vi.mocked(fetch).mockResolvedValue(
        jsonResponse({ AUTH: AUTH_OK, "GET-PARCELS": { RESULT: "ERROR" } })
      );
      await expect(getTracking(API_KEY, "X")).rejects.toThrow(
        "Erreur ForceLog inconnue."
      );
    });

    it("throws when the response body isn't valid JSON", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error("not json");
        },
      } as unknown as Response);
      await expect(getCities(API_KEY)).rejects.toThrow(ForceLogApiError);
    });

    it("throws when the network call itself fails", async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new TypeError("fetch failed"));
      await expect(getCities(API_KEY)).rejects.toThrow(
        "Impossible de joindre ForceLog"
      );
    });
  });

  describe("getCities", () => {
    it("unwraps the Cities map from the AUTH-only response (no per-op wrapper)", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        jsonResponse({
          AUTH: AUTH_OK,
          Cities: {
            "1": { CODE: "MRK", NAME: "Marrakech", D_FEES: 35, D_FEES_SAME_CITY: 25 },
          },
        })
      );
      const result = await getCities(API_KEY);
      expect(result["1"].NAME).toBe("Marrakech");
    });
  });

  describe("addParcel", () => {
    // Shape verified against the live API: the created parcel sits under
    // ADD-PARCEL.NEW-PARCEL, not flat in the operation block like the
    // other endpoints.
    const ADD_PARCEL_OK = {
      AUTH: AUTH_OK,
      "ADD-PARCEL": {
        RESULT: "SUCCESS",
        MESSAGE: "New Parcel Added Successfully",
        "NEW-PARCEL": {
          TRACKING_NUMBER: "F-MRK196GYJH9X",
          ORDER_NUM: "spc-1003",
          RECEIVER: "soufiane imil",
        },
      },
    };

    it("unwraps the tracking number from the nested NEW-PARCEL block", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(ADD_PARCEL_OK));

      const result = await addParcel(API_KEY, {
        ORDER_NUM: "spc-1003",
        RECEIVER: "soufiane imil",
        PHONE: "0660164362",
        CITY: "Oujda",
        ADDRESS: "Oujda",
      });

      expect(result.TRACKING_NUMBER).toBe("F-MRK196GYJH9X");

      const [url, init] = vi.mocked(fetch).mock.calls[0];
      expect(String(url)).toContain("/Parcels/AddParcel");
      expect(init?.method).toBe("POST");
      expect(JSON.parse(init?.body as string)).toMatchObject({
        ORDER_NUM: "spc-1003",
      });
    });

    it("throws rather than returning an order with no tracking number", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        jsonResponse({
          AUTH: AUTH_OK,
          "ADD-PARCEL": { RESULT: "SUCCESS", MESSAGE: "ok" },
        })
      );
      await expect(
        addParcel(API_KEY, {
          ORDER_NUM: "x",
          RECEIVER: "x",
          PHONE: "0600000000",
          CITY: "Marrakech",
          ADDRESS: "x",
        })
      ).rejects.toThrow("numero de suivi");
    });
  });

  describe("getRecentParcelStatuses", () => {
    it("indexes delivery and payment status by tracking number", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        jsonResponse({
          AUTH: AUTH_OK,
          "GET-PARCELS": {
            RESULT: "SUCCESS",
            PARCELS: [
              {
                TRACKING_NUMBER: "F-AAA",
                STATUS: "Livre",
                STATUS_CODE: "DELIVERED",
                SITUATION: "Facture",
              },
              {
                TRACKING_NUMBER: "F-BBB",
                STATUS: "En cours de livraison",
                STATUS_CODE: "DISTRIBUTION",
                SITUATION: "Non Paye",
              },
            ],
          },
        })
      );

      const statuses = await getRecentParcelStatuses(API_KEY);
      expect(statuses.get("F-AAA")).toEqual({
        status: "Livre",
        statusCode: "DELIVERED",
        situation: "Facture",
      });
      expect(statuses.get("F-BBB")?.statusCode).toBe("DISTRIBUTION");
      expect(statuses.size).toBe(2);
    });
  });

  describe("getTracking", () => {
    it("passes the parcel code as a query parameter", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        jsonResponse({
          AUTH: AUTH_OK,
          "GET-TRACKING": { RESULT: "SUCCESS", TRACKING: [] },
        })
      );
      await getTracking(API_KEY, "PARCEL-1");
      const [url] = vi.mocked(fetch).mock.calls[0];
      expect(String(url)).toContain("Code=PARCEL-1");
    });
  });
});

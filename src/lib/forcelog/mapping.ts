import type { AddParcelParams } from "./types";

/**
 * Minimal shape this mapping needs from a Lead2Door lead/order — kept
 * decoupled from the full `Lead` type in `leads-data.ts` so this module
 * has no dependency on the dashboard component tree and stays easy to
 * unit test in isolation.
 */
export type MappableOrder = {
  reference: string;
  client: string;
  phone: string;
  ville?: string;
  adresse?: string;
  amount: string;
  productName: string;
};

function parseAmount(amount: string): number | undefined {
  const digits = amount.replace(/[^\d.,-]/g, "").replace(",", ".");
  const value = Number.parseFloat(digits);
  return Number.isFinite(value) ? Math.round(value) : undefined;
}

/**
 * Maps a Lead2Door order to ForceLog's `AddParcel` payload.
 *
 * - COD (cash to collect) comes from the order's `amount`.
 * - CITY/ADDRESS fall back to placeholders when missing on the order so
 *   the request still has the required fields — callers should prefer
 *   validating those are present before calling this in production.
 */
export function mapOrderToParcel(order: MappableOrder): AddParcelParams {
  return {
    ORDER_NUM: order.reference.slice(0, 20),
    RECEIVER: order.client.slice(0, 50),
    PHONE: order.phone.slice(0, 14),
    CITY: (order.ville ?? "").slice(0, 50),
    ADDRESS: (order.adresse ?? order.ville ?? "").slice(0, 100),
    PRODUCT_NATURE: order.productName.slice(0, 100),
    COD: parseAmount(order.amount),
  };
}

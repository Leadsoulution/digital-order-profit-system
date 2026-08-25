"use client";

import { useState } from "react";
import { RefreshCw, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { leadStatusOptions } from "./leads-data";

export default function ChangeStatusModal({
  count,
  onClose,
  onApply,
}: {
  count: number;
  onClose: () => void;
  onApply: (status: string) => void;
}) {
  const [status, setStatus] = useState(leadStatusOptions[0]);
  const [override, setOverride] = useState(false);
  const [reason, setReason] = useState("");

  const canApply = status !== "Aucun changement" || override;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <RefreshCw className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">
                Mettre a jour le statut de <span className="font-mono">{count}</span> commande{count > 1 ? "s" : ""}
              </h2>
              <p className="mt-0.5 text-[12.5px] text-gray-500">
                Appliquer un statut manuel a la selection. Si vous choisissez
                un statut de livraison, les statuts associes seront calcules
                automatiquement.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Statut
            </label>
            <SelectDropdown
              variant="field"
              pinnedLabel={status}
              options={leadStatusOptions}
              value={status}
              onSelect={setStatus}
            />
          </div>

          <label className="flex items-center gap-2 text-[12.5px] text-gray-700">
            <input
              type="checkbox"
              checked={override}
              onChange={(e) => setOverride(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300"
            />
            Utiliser le mode override manuel
          </label>

          {override && (
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Raison de l&apos;override
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Expliquez pourquoi ce statut doit etre applique."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2.5 border-t border-gray-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            disabled={!canApply}
            onClick={() => onApply(status)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 disabled:opacity-40"
          >
            Appliquer le statut
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { agents } from "./leads-data";

export default function AssignModal({
  count,
  onClose,
  onApply,
}: {
  count: number;
  onClose: () => void;
  onApply: (agent: string) => void;
}) {
  const [agent, setAgent] = useState(agents[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <UserPlus className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">
                Assigner <span className="font-mono">{count}</span> commande{count > 1 ? "s" : ""}
              </h2>
              <p className="mt-0.5 text-[12.5px] text-gray-500">
                Choisissez l&apos;agent qui prendra en charge ces leads.
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

        <div className="px-5 py-4">
          <label className="mb-1 block text-[12.5px] text-gray-600">
            Agent
          </label>
          <SelectDropdown
            variant="field"
            pinnedLabel={agent}
            options={agents}
            value={agent}
            onSelect={setAgent}
          />
        </div>

        <div className="flex justify-end gap-2.5 border-t border-gray-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() => onApply(agent)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            Assigner les commandes
          </button>
        </div>
      </div>
    </div>
  );
}

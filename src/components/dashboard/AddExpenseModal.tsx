"use client";

import { useState } from "react";
import { Receipt, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { expenseCategories } from "./finance-data";

export default function AddExpenseModal({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-sm sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Receipt className="mt-0.5 h-4 w-4 text-gray-700" />
            <h2 className="text-h2 font-semibold text-gray-900">
              Ajouter une depense
            </h2>
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
              Libelle *
            </label>
            <input
              type="text"
              placeholder="Ex: Achat emballages"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Montant *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
              />
              <span className="shrink-0 text-[12.5px] text-gray-500">MAD</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Categorie
            </label>
            <SelectDropdown
              variant="field"
              pinnedLabel="Selectionner"
              options={expenseCategories}
              value={category ?? undefined}
              onSelect={setCategory}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Note
            </label>
            <textarea
              placeholder="Details (optionnel)"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Annuler
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Ajouter la depense
          </button>
        </div>
      </div>
    </div>
  );
}

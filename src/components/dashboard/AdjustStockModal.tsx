"use client";

import { useState } from "react";
import { Boxes, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { stockMovementTypes, type Product } from "./products-data";

export default function AdjustStockModal({
  product,
  onClose,
  onApply,
}: {
  product: Product;
  onClose: () => void;
  onApply: (type: string, quantity: number, reason: string) => void;
}) {
  const [type, setType] = useState(stockMovementTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Boxes className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">
                Ajuster le stock
              </h2>
              <p className="mt-0.5 text-[12.5px] text-gray-500">
                {product.name} &middot; <span className="font-mono">{product.sku}</span> &middot; Disponible :{" "}
                <span className="font-mono">{product.disponible}</span>
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
              Type de mouvement
            </label>
            <SelectDropdown
              variant="field"
              pinnedLabel={type}
              options={stockMovementTypes}
              value={type}
              onSelect={setType}
            />
          </div>
          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Quantite
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Raison
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: reception fournisseur ou correction inventaire"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-gray-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() => onApply(type, quantity, reason)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

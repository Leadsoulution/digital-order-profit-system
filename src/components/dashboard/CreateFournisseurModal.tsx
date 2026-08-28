"use client";

import { useState } from "react";
import { Building2, Info, X } from "lucide-react";
import { products } from "./products-data";

export default function CreateFournisseurModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [linkedProducts, setLinkedProducts] = useState<string[]>([]);

  function toggleProduct(sku: string) {
    setLinkedProducts((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-lg sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-h2 font-semibold text-gray-900">
            Nouveau fournisseur
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:max-h-[70vh] sm:flex-none">
          <div className="flex items-start gap-2.5 rounded-lg bg-blue-50 p-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <div>
              <p className="text-[13px] font-medium text-blue-900">
                Nouveau fournisseur
              </p>
              <p className="text-[12px] text-blue-700">
                Renseignez les coordonnees et les produits rattaches.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Nom de l&apos;entreprise *
              </label>
              <input
                type="text"
                placeholder="Ex: Guangzhou Trading Co."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Nom du contact *
              </label>
              <input
                type="text"
                placeholder="Ex: Li Wei"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Telephone
              </label>
              <input
                type="text"
                placeholder="06 12 34 56 78"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="contact@fournisseur.ma"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Delai de paiement (jours)
              </label>
              <input
                type="number"
                placeholder="30"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Adresse
              </label>
              <input
                type="text"
                placeholder="Bd Mohammed V, Casablanca"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Note operateur
            </label>
            <textarea
              placeholder="Prioriser les livraisons du matin."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <p className="mb-2 text-[12.5px] text-gray-600">Produits lies</p>
            <div className="max-h-40 space-y-0.5 overflow-y-auto rounded-lg border border-gray-200 p-2">
              {products.map((product) => (
                <label
                  key={product.sku}
                  className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[13px] text-gray-700 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={linkedProducts.includes(product.sku)}
                    onChange={() => toggleProduct(product.sku)}
                    className="h-3.5 w-3.5 rounded border-gray-300"
                  />
                  {product.name}
                </label>
              ))}
            </div>
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
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            <Building2 className="h-3.5 w-3.5" />
            Creer le fournisseur
          </button>
        </div>
      </div>
    </div>
  );
}

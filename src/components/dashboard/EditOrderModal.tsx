"use client";

import { useState } from "react";
import {
  ChevronDown,
  Minus,
  Pencil,
  Plus,
  Search,
  X,
} from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { moroccanCities, type Lead } from "./leads-data";

const catalogProducts = [
  { name: "SAC LO", price: 75 },
  { name: "Diffuseur Atlas Zen", price: 259 },
  { name: "Sac Cuir Marrakech", price: 289 },
  { name: "Bracelet Atlas Silver", price: 179 },
  { name: "Serum Derma Glow", price: 228 },
  { name: "Powerbank MagSafe Atlas", price: 389 },
  { name: "Kit Elan Argan", price: 278 },
  { name: "Montre Pro X V2", price: 799 },
  { name: "Ecouteurs Elite ANC", price: 249 },
  { name: "Argan Care Intense", price: 199 },
  { name: "Organiseur Voyage Nomad", price: 249 },
  { name: "Lampe Casa Smart", price: 329 },
  { name: "Poudre Drops Casa Soft", price: 459 },
];

type SelectedProduct = { name: string; price: number; qty: number };

export default function EditOrderModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: () => void;
}) {
  const [productQuery, setProductQuery] = useState("");
  const [selected, setSelected] = useState<SelectedProduct[]>(() => {
    const match = catalogProducts.find((p) => p.name === lead.productName);
    return match ? [{ ...match, qty: 1 }] : [];
  });
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [externalStatus, setExternalStatus] = useState("");

  const filteredProducts = productQuery
    ? catalogProducts.filter((p) =>
        p.name.toLowerCase().includes(productQuery.toLowerCase())
      )
    : catalogProducts;

  function addProduct(product: (typeof catalogProducts)[number]) {
    setSelected((prev) => {
      const existing = prev.find((p) => p.name === product.name);
      if (existing) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function changeQty(name: string, delta: number) {
    setSelected((prev) =>
      prev
        .map((p) => (p.name === name ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  }

  const subtotal = selected.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-lg sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Pencil className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">
                Modifier les details de la commande
              </h2>
              <p className="mt-0.5 max-w-sm text-[12.5px] text-gray-500">
                Mettez a jour les informations client et livraison. Les
                valeurs inconnues restent non modifiees.
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

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4 sm:max-h-[70vh] sm:flex-none">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Nom client
              </label>
              <input
                type="text"
                defaultValue={lead.client}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Telephone
              </label>
              <input
                type="text"
                defaultValue={lead.phone}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              INFORMATIONS COMPLEMENTAIRES
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Telephone WhatsApp (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="06 12 34 56 78"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[12.5px] text-gray-600">
                    Ville
                  </label>
                  <SelectDropdown
                    variant="field"
                    pinnedLabel={lead.ville ?? "Aucune ville"}
                    options={moroccanCities}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12.5px] text-gray-600">
                    Quartier
                  </label>
                  <input
                    type="text"
                    defaultValue={lead.quartier}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Adresse
                </label>
                <input
                  type="text"
                  defaultValue={lead.adresse}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              PRODUIT
            </p>
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Rechercher des produits"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>

            {selected.length > 0 && (
              <div className="mb-2 space-y-2">
                {selected.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2"
                  >
                    <div className="h-9 w-9 shrink-0 rounded-md bg-gray-100" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-gray-800">
                        {p.name}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        <span className="font-mono">{p.price} MAD</span> / unite
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 px-1.5 py-1">
                      <button
                        onClick={() => changeQty(p.name, -1)}
                        className="rounded p-0.5 text-gray-500 hover:bg-gray-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center font-mono text-[12.5px] text-gray-700">
                        {p.qty}
                      </span>
                      <button
                        onClick={() => changeQty(p.name, 1)}
                        className="rounded p-0.5 text-gray-500 hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.name}
                  onClick={() => addProduct(product)}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-100 px-3 py-2 text-left hover:bg-gray-50"
                >
                  <div className="h-8 w-8 shrink-0 rounded-md bg-gray-100" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-gray-700">
                    {product.name}
                  </span>
                  <span className="shrink-0 text-[12px] text-gray-500">
                    <span className="font-mono">{product.price} MAD</span> / unite
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                  SOUS-TOTAL CATALOGUE
                </p>
                <p className="mt-1 font-mono text-[13px] font-medium text-gray-700">
                  {subtotal} MAD
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                  TOTAL DE LA COMMANDE
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={subtotal}
                    key={subtotal}
                    className="w-20 rounded-md border border-gray-200 px-2 py-1 font-mono text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                  <span className="text-[13px] text-gray-500">MAD</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="flex w-full items-center justify-between text-[12.5px] font-medium text-gray-600"
            >
              Parametres avances
              <ChevronDown
                className={`h-3.5 w-3.5 text-gray-400 transition-transform ${advancedOpen ? "rotate-180" : ""}`}
              />
            </button>
            {advancedOpen && (
              <div className="mt-2">
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Statut externe (optionnel)
                </label>
                <input
                  type="text"
                  value={externalStatus}
                  onChange={(e) => setExternalStatus(e.target.value)}
                  placeholder="unpaid, pending, ..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
            )}
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
            onClick={onSave}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Enregistrer les details
          </button>
        </div>
      </div>
    </div>
  );
}

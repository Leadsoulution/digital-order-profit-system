"use client";

import { useState } from "react";
import {
  ShoppingCart,
  X,
  Phone,
  PhoneCall,
  MessageCircle,
  Search,
  ChevronDown,
  Truck,
  User,
  Tag,
  Package,
} from "lucide-react";
import { agents, moroccanCities } from "./leads-data";
import SelectDropdown from "./SelectDropdown";

const products = [
  {
    id: "sac-lo",
    name: "SAC LO",
    detail: "2 variantes",
    price: "75 MAD / unite",
  },
  {
    id: "diffuseur-atlas-zen",
    name: "Diffuseur Atlas Zen",
    detail: "Diffuseur d ambiance compact po...",
    price: "259 MAD / unite",
  },
  {
    id: "serum-derma-glow",
    name: "Serum Derma Glow",
    detail: "Serum visage leger pour eclat et h...",
    price: "229 MAD / unite",
  },
  {
    id: "powerbank-magsafe-atlas",
    name: "Powerbank MagSafe Atlas",
    detail: "Batterie magnetique compact po...",
    price: "389 MAD / unite",
  },
];

export default function CreateCommandeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [champsAvances, setChampsAvances] = useState(false);
  const [secondaryPhoneEnabled, setSecondaryPhoneEnabled] = useState(false);
  const [contactType, setContactType] = useState<"whatsapp" | "calls">(
    "whatsapp"
  );

  function toggleProduct(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-lg sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <ShoppingCart className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">
                Creer une commande manuelle
              </h2>
              <p className="mt-0.5 max-w-sm text-[12.5px] text-gray-500">
                Capturez une vraie commande manuelle. L&apos;assignation auto
                ne s&apos;applique que si les champs requis de regle sont
                fournis.
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
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gray-500">
              <User className="h-3 w-3" />
              NOM CLIENT
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Nom client
                </label>
                <input
                  type="text"
                  placeholder="Yassine El Idrissi"
                  className="w-full rounded-lg border border-blue-400 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
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
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-[13px] font-medium text-gray-700">
                    Telephone secondaire
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Ajouter un numero de contact alternatif
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSecondaryPhoneEnabled((v) => !v)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                {secondaryPhoneEnabled ? "Desactiver" : "Activer"}
              </button>
            </div>

            {secondaryPhoneEnabled && (
              <div className="mt-3 space-y-3 border-t border-gray-200 pt-3">
                <div>
                  <label className="mb-1 block text-[12.5px] text-gray-600">
                    Numero secondaire
                  </label>
                  <input
                    type="text"
                    placeholder="06XXXXXXXX"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12.5px] text-gray-600">
                    Type de contact
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setContactType("whatsapp")}
                      className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-left ${
                        contactType === "whatsapp"
                          ? "border-gray-900"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                          contactType === "whatsapp"
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {contactType === "whatsapp" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                        )}
                      </span>
                      <MessageCircle className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-[12.5px] font-medium text-gray-700">
                        WhatsApp
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactType("calls")}
                      className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-left ${
                        contactType === "calls"
                          ? "border-gray-900"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                          contactType === "calls"
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {contactType === "calls" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                        )}
                      </span>
                      <PhoneCall className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-[12.5px] font-medium text-gray-700">
                        Appels uniquement
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gray-500">
              <Tag className="h-3 w-3" />
              DETAILS DE LA COMMANDE
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Reference (optionnelle)
                </label>
                <input
                  type="text"
                  placeholder="Laisser vide pour generation"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Cle source
                </label>
                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
                  Aucune
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gray-500">
              <Package className="h-3 w-3" />
              PRODUIT
            </p>

            {selected.length === 0 && (
              <div className="mb-3 rounded-lg border border-dashed border-gray-200 px-3 py-2.5 text-center text-[12.5px] text-gray-400">
                Aucun produit selectionne
              </div>
            )}

            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des produits"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
              {products.map((product) => {
                const isSelected = selected.includes(product.id);
                return (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <div className="h-9 w-9 shrink-0 rounded-md bg-gray-100" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="truncate text-[12px] text-gray-500">
                        {product.detail}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-[12.5px] text-gray-600">
                      {product.price}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  </button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                  SOUS-TOTAL CATALOGUE
                </p>
                <p className="mt-1 text-[13px] font-medium text-gray-400">
                  —
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                  TOTAL DE LA COMMANDE
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue="0"
                    className="w-20 rounded-md border border-gray-200 px-2 py-1 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                  <span className="text-[13px] text-gray-500">MAD</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gray-500">
              <Truck className="h-3 w-3" />
              LIVRAISON
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Ville
                </label>
                <SelectDropdown
                  variant="field"
                  pinnedLabel="Aucune ville"
                  options={moroccanCities}
                  searchable
                  searchPlaceholder="Rechercher une ville..."
                />
              </div>
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Adresse
                </label>
                <input
                  type="text"
                  placeholder="Rue Abou Al Waqt, Immeuble 12, App 4"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gray-500">
              <User className="h-3 w-3" />
              AGENT ASSIGNE
            </p>
            <SelectDropdown
              variant="field"
              pinnedLabel="Laisser non assigne"
              options={agents}
            />
          </div>

          <button
            type="button"
            onClick={() => setChampsAvances((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-left hover:bg-gray-50"
          >
            <div>
              <p className="text-[13px] font-medium text-gray-700">
                Champs avances
              </p>
              <p className="text-[12px] text-gray-500">
                Inclure les metadonnees optionnelles campagne, page et notes.
              </p>
            </div>
            <span
              className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                champsAvances ? "bg-gray-900" : "bg-gray-200"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  champsAvances ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Annuler
          </button>
          <button className="w-full rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto">
            Creer commande
          </button>
        </div>
      </div>
    </div>
  );
}

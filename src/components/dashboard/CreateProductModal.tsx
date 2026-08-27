"use client";

import { useRef, useState } from "react";
import { ImagePlus, Package, Plus, Trash2, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import Toggle from "./Toggle";
import MediaPickerModal from "./MediaPickerModal";
import { suppliers } from "./products-data";

type VariantOption = {
  id: string;
  name: string;
  values: string[];
};

export default function CreateProductModal({ onClose }: { onClose: () => void }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"Actif" | "Archive">("Actif");
  const [supplier, setSupplier] = useState<string | null>(null);
  const [trackStock, setTrackStock] = useState(true);
  const [allowBackorder, setAllowBackorder] = useState(false);
  const [options, setOptions] = useState<VariantOption[]>([]);
  const nextId = useRef(0);

  function addOption() {
    nextId.current += 1;
    setOptions((prev) => [
      ...prev,
      { id: `opt-${nextId.current}`, name: "", values: [] },
    ]);
  }

  function updateOptionName(id: string, name: string) {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)));
  }

  function updateOptionValues(id: string, raw: string) {
    const values = raw
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, values } : o)));
  }

  function removeOption(id: string) {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  }

  const variantCount = options.reduce(
    (acc, o) => (o.values.length > 0 ? acc * o.values.length : acc),
    1
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-lg sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Package className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">
                Nouveau produit
              </h2>
              <p className="mt-0.5 max-w-sm text-[12.5px] text-gray-500">
                Renseignez les informations du produit, ajoutez des images et
                recherchez un fournisseur.
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
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              IMAGES PRODUIT
            </p>
            <button
              onClick={() => setMediaOpen(true)}
              className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center hover:bg-gray-50"
            >
              {image ? (
                <div className="h-12 w-12 rounded-md bg-gray-100" />
              ) : (
                <ImagePlus className="h-5 w-5 text-gray-400" />
              )}
              <p className="text-[12.5px] text-gray-600">
                {image ?? "Selectionnez des images depuis la bibliotheque ou televersez une image principale"}
              </p>
            </button>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              INFORMATIONS GENERALES
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Nom *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Argan Cream Offer"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Laisse vide pour genere"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Description
            </label>
            <textarea
              placeholder="Description produit (optionnel)"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <p className="mb-2 text-[12.5px] text-gray-600">Statut</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatus("Actif")}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium ${
                  status === "Actif"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Actif
              </button>
              <button
                onClick={() => setStatus("Archive")}
                className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-medium ${
                  status === "Archive"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Archive
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Prix de vente *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={0}
                  step="0.01"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                />
                <span className="shrink-0 text-[12.5px] text-gray-500">MAD</span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Cout fournisseur *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={0}
                  step="0.01"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                />
                <span className="shrink-0 text-[12.5px] text-gray-500">MAD</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Fournisseur
            </label>
            <SelectDropdown
              variant="field"
              pinnedLabel="Aucun fournisseur"
              options={suppliers}
              value={supplier ?? undefined}
              onSelect={setSupplier}
              searchable
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              STOCK
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Stock initial
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12.5px] text-gray-600">
                  Seuil de reappro
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-100 px-3">
              <Toggle
                checked={trackStock}
                onChange={() => setTrackStock((v) => !v)}
                label="Suivi de stock"
                description="Desactivez si le produit n'a pas besoin de suivi de stock precis"
              />
              <Toggle
                checked={allowBackorder}
                onChange={() => setAllowBackorder((v) => !v)}
                label="Autoriser la backorder"
                description="Permettre les commandes si le stock est insuffisant"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                OPTIONS
              </p>
              <button
                onClick={addOption}
                className="flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter une variante
              </button>
            </div>

            {options.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 px-3 py-3 text-center text-[12px] text-gray-400">
                Aucune option pour l&apos;instant. Ajoutez une option comme
                Couleur, Taille pour generer des combinaisons.
              </p>
            ) : (
              <div className="space-y-3">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) =>
                          updateOptionName(option.id, e.target.value)
                        }
                        placeholder="Nom de l'option (ex: Couleur)"
                        className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[12.5px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                      />
                      <button
                        onClick={() => removeOption(option.id)}
                        className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      onChange={(e) =>
                        updateOptionValues(option.id, e.target.value)
                      }
                      placeholder="Valeurs possibles, separees par des virgules (ex: Bleu, Rouge)"
                      className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[12.5px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                    />
                    {option.values.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {option.values.map((v) => (
                          <span
                            key={v}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {variantCount > 1 && (
                  <p className="text-center text-[12px] text-gray-500">
                    Genere <span className="font-mono">{variantCount}</span> variantes
                  </p>
                )}
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
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Creer le produit
          </button>
        </div>
      </div>

      {mediaOpen && (
        <MediaPickerModal
          onClose={() => setMediaOpen(false)}
          onSelect={(name) => setImage(name)}
        />
      )}
    </div>
  );
}

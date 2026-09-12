"use client";

import { useState } from "react";
import { AlertCircle, Loader2, MapPin, X } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import type { City, TariffSource } from "@/lib/supabase/cities";

const SOURCES: { value: TariffSource; label: string }[] = [
  { value: "canonique", label: "Tarif canonique" },
  { value: "transporteur", label: "Prix transporteur" },
  { value: "force", label: "Prix force" },
];

export default function CityModal({
  city,
  onClose,
  onSaved,
}: {
  city: City | null;
  onClose: () => void;
  onSaved: (city: City) => void;
}) {
  const [name, setName] = useState(city?.name ?? "");
  const [key, setKey] = useState(city?.key ?? "");
  const [tariff, setTariff] = useState(String(city?.tariff ?? ""));
  const [source, setSource] = useState<TariffSource>(
    city?.tariffSource ?? "canonique"
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const sourceLabel =
    SOURCES.find((s) => s.value === source)?.label ?? SOURCES[0].label;

  async function submit() {
    setError(null);
    if (!name.trim()) {
      setError("Le nom de la ville est requis.");
      return;
    }
    setPending(true);
    try {
      const body = {
        name: name.trim(),
        // Une cle vide laisse le serveur la deduire du nom.
        ...(key.trim() ? { key: key.trim() } : {}),
        tariff: Number(tariff) || 0,
        tariffSource: source,
      };
      const res = await fetch(city ? `/api/cities/${city.id}` : "/api/cities", {
        method: city ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSaved(data.city);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 text-gray-700" />
            <h2 className="text-h2 font-semibold text-gray-900">
              {city ? "Modifier la ville" : "Ajouter une ville canonique"}
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
              Ville canonique
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Beni Mellal"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Cle (optionnel)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="beni_mellal"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
            <p className="mt-1 text-[11.5px] text-gray-400">
              Laissee vide, elle est deduite du nom.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Tarif de livraison (MAD)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              placeholder="35"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Origine du tarif
            </label>
            <SelectDropdown
              variant="field"
              pinnedLabel={sourceLabel}
              options={SOURCES.map((s) => s.label)}
              value={sourceLabel}
              onSelect={(label) =>
                setSource(
                  SOURCES.find((s) => s.label === label)?.value ?? "canonique"
                )
              }
            />
            <p className="mt-1 text-[11.5px] text-gray-400">
              Un prix force resiste aux imports transporteur.
            </p>
          </div>

          {error && (
            <p className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12.5px] text-red-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
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
            onClick={submit}
            disabled={pending}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

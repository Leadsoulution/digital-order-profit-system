"use client";

import { useState } from "react";
import { Plus, Tag, X } from "lucide-react";
import type { City } from "@/lib/supabase/cities";

/**
 * Alias d'une ville : les orthographes rencontrees dans les imports et
 * les saisies, qui doivent toutes se rattacher a la meme ville canonique.
 */
export default function CityAliasesModal({
  city,
  onClose,
  onSaved,
}: {
  city: City;
  onClose: () => void;
  onSaved: (aliases: string[]) => void;
}) {
  const [aliases, setAliases] = useState<string[]>(city.aliases);
  const [draft, setDraft] = useState("");

  function add() {
    const value = draft.trim();
    if (!value) return;
    // Doublon insensible a la casse : "Casa" et "casa" ne servent a rien
    // deux fois, la normalisation les traite pareil.
    if (aliases.some((a) => a.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      return;
    }
    setAliases((prev) => [...prev, value]);
    setDraft("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Tag className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">Alias</h2>
              <p className="mt-0.5 text-[12.5px] text-gray-500">{city.name}</p>
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
          <div className="flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
              placeholder="Ex: beni-mellal"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
            <button
              onClick={add}
              className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Ajouter
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {aliases.length === 0 && (
              <p className="text-[12.5px] text-gray-400">
                Aucun alias pour cette ville.
              </p>
            )}
            {aliases.map((alias) => (
              <span
                key={alias}
                className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 py-1 pl-2.5 pr-1.5 text-[12.5px] text-gray-700"
              >
                {alias}
                <button
                  onClick={() =>
                    setAliases((prev) => prev.filter((a) => a !== alias))
                  }
                  aria-label={`Retirer ${alias}`}
                  className="rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
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
            onClick={() => onSaved(aliases)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

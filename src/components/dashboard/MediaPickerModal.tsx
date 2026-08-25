"use client";

import { useState } from "react";
import { Search, Upload, X } from "lucide-react";
import { mediaLibrary } from "./products-data";

export default function MediaPickerModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (name: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = mediaLibrary.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase())
  );

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-[15px] font-semibold text-gray-900">
            Selectionner des medias
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher des fichiers"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="h-3.5 w-3.5" />
              Importer
            </button>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[12px] font-medium text-gray-600">
              Tous les usages
            </span>
            <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[12px] font-medium text-gray-600">
              Tous etiquetage
            </span>
          </div>

          <p className="mb-2 text-[11.5px] text-gray-400">
            {mediaLibrary.length} media(s)
          </p>

          <div className="grid max-h-72 grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
            {filtered.map((name) => {
              const isSelected = selected.includes(name);
              return (
                <button
                  key={name}
                  onClick={() => toggle(name)}
                  className={`overflow-hidden rounded-lg border text-left ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex h-16 items-center justify-center bg-gray-100 text-gray-300">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="truncate px-1.5 py-1 text-[10px] text-gray-500">
                    {name}
                  </p>
                </button>
              );
            })}
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
            onClick={() => {
              if (selected[0]) onSelect(selected[0]);
              onClose();
            }}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            Terminer ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}

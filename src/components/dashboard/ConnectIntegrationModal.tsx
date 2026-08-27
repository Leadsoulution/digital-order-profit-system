"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, X } from "lucide-react";
import Toggle from "./Toggle";
import type { Integration } from "./integrations-data";

const platformCopy: Record<string, { blurb: string; urlLabel: string; urlHint: string }> = {
  woocommerce: {
    blurb: "Connectez votre site WordPress/WooCommerce pour centraliser vos commandes",
    urlLabel: "URL du site WordPress",
    urlHint: "L'URL de votre boutique WooCommerce",
  },
};

export default function ConnectIntegrationModal({
  integration,
  onClose,
}: {
  integration: Integration;
  onClose: () => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const copy = platformCopy[integration.id] ?? {
    blurb: `Connectez ${integration.name} pour synchroniser vos donnees automatiquement`,
    urlLabel: "URL de connexion",
    urlHint: `L'URL de votre compte ${integration.name}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-md sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-h2 font-semibold text-gray-900">
              Connecter {integration.name}
            </h2>
            <p className="mt-0.5 max-w-sm text-[12.5px] text-gray-500">
              Enregistrez les parametres de connexion partages utilises par
              les imports {integration.name}.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:max-h-[70vh] sm:flex-none">
          <div className="flex items-start gap-2.5 rounded-lg bg-gray-50 p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <div>
              <p className="text-[13px] font-medium text-gray-800">
                {integration.name}
              </p>
              <p className="text-[12px] text-gray-500">{copy.blurb}</p>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              {copy.urlLabel}
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">{copy.urlHint}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Cle consommateur
              </label>
              <input
                type="password"
                placeholder="ck_XXXX..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                WooCommerce &gt; Reglages &gt; Avance &gt; API REST
              </p>
            </div>
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Secret consommateur
              </label>
              <input
                type="password"
                placeholder="cs_XXXX..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Laissez vide pour conserver le secret actuel.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-gray-600 hover:text-gray-800"
          >
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${
                advancedOpen ? "rotate-90" : ""
              }`}
            />
            Options avancees
          </button>

          {advancedOpen && (
            <div>
              <label className="mb-1 block text-[12.5px] text-gray-600">
                Prefixe de reference des commandes
              </label>
              <input
                type="text"
                placeholder="Ex: WOO-"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          )}

          <div className="rounded-lg border border-gray-100 px-3">
            <Toggle
              checked={enabled}
              onChange={() => setEnabled((v) => !v)}
              label="Activer cette integration"
              description="Gardez cette connexion active quand les imports de cette plateforme doivent rester disponibles dans la version actuelle."
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Fermer
          </button>
          <button
            onClick={onClose}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Enregistrer la connexion
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Toggle from "./Toggle";

export default function CreateUserModal({ onClose }: { onClose: () => void }) {
  const [suiviLivraison, setSuiviLivraison] = useState(false);
  const [importsExcel, setImportsExcel] = useState(false);
  const [creationProspects, setCreationProspects] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-sm sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-h2 font-semibold text-gray-900">
            Ajouter un utilisateur
          </h2>
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
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Ex: Fatima Zahra Benali"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Adresse email
            </label>
            <input
              type="email"
              defaultValue="admin@lead2door.com"
              className="w-full rounded-lg border border-blue-200 bg-blue-50/40 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Telephone
            </label>
            <input
              type="text"
              placeholder="+212 6 12 34 56 78"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Mot de passe temporaire
            </label>
            <input
              type="password"
              defaultValue="temporaire123"
              className="w-full rounded-lg border border-gray-200 bg-blue-50/40 px-3 py-2 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="rounded-lg border border-teal-100 bg-teal-50 px-3">
            <Toggle
              checked={suiviLivraison}
              onChange={() => setSuiviLivraison((v) => !v)}
              label="Acces suivi livraison"
              description="Autoriser cet agent a modifier les statuts livraison des commandes apres expedition."
            />
          </div>

          <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3">
            <Toggle
              checked={importsExcel}
              onChange={() => setImportsExcel((v) => !v)}
              label="Acces imports Excel"
              description="Autoriser cet agent a importer des fichiers commandes pour les admins."
            />
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50 px-3">
            <Toggle
              checked={creationProspects}
              onChange={() => setCreationProspects((v) => !v)}
              label="Acces creation prospects"
              description="Autoriser cet agent a creer des prospects depuis l'application mobile."
            />
          </div>

          <div className="rounded-lg border border-gray-100 px-3">
            <Toggle
              checked={active}
              onChange={() => setActive((v) => !v)}
              label="Compte actif"
              description="L'utilisateur peut se connecter"
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
            Creer l&apos;utilisateur
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Bike, X } from "lucide-react";
import type { Lead } from "./leads-data";

/**
 * Saisie du livreur et de la date de livraison.
 *
 * Ces informations n'existent nulle part dans l'API ForceLog (GetParcels
 * ne renvoie que le statut, GetTracking refuse les numeros de suivi) :
 * elles sont donc renseignees ici, ou par le webhook si le transporteur
 * finit par les transmettre.
 */
export default function DelivererModal({
  lead,
  onClose,
  onApply,
}: {
  lead: Lead;
  onClose: () => void;
  onApply: (changes: Partial<Lead>) => void;
}) {
  const [name, setName] = useState(lead.deliverer ?? "");
  const [phone, setPhone] = useState(lead.delivererPhone ?? "");
  const [date, setDate] = useState(lead.deliveryDate ?? "");

  function submit() {
    // Chaines vides volontaires plutot que `undefined` : elles traversent
    // `toRow` et permettent d'effacer une valeur deja enregistree.
    onApply({
      deliverer: name.trim(),
      delivererPhone: phone.trim(),
      deliveryDate: date.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <Bike className="mt-0.5 h-4 w-4 text-gray-700" />
            <div>
              <h2 className="text-h2 font-semibold text-gray-900">
                Livreur et livraison
              </h2>
              <p className="mt-0.5 text-[12.5px] text-gray-500">
                Commande{" "}
                <span className="font-mono">{lead.reference}</span>
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
              Nom du livreur
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="NASSIRI"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Telephone du livreur
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0612345678"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
            <p className="mt-1 text-[11.5px] text-gray-400">
              Sert aux boutons appel et WhatsApp de la colonne Livreur.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-[12.5px] text-gray-600">
              Date de livraison
            </label>
            <input
              type="datetime-local"
              value={date.replace(" ", "T")}
              onChange={(e) => setDate(e.target.value.replace("T", " "))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
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
            onClick={submit}
            className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

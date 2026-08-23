"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Download,
  Upload,
  Plus,
  Search,
  SlidersHorizontal,
  Calendar,
  Truck,
  User,
  Tag,
  Package,
  AlertTriangle,
  Clock,
  Wallet,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  leads,
  tabs,
  dateRanges,
  sourceBadgeStyles,
  agents,
  expeditionStatuses,
} from "./leads-data";
import RowActionsMenu from "./RowActionsMenu";
import CreateCommandeModal from "./CreateCommandeModal";
import SelectDropdown from "./SelectDropdown";

const staticFilterFields = [
  { label: "Tous Source", icon: Tag },
  { label: "Tous Produit", icon: Package },
  { label: "Tous Statut livraison personnalise", icon: Truck },
  { label: "Tous Attention", icon: AlertTriangle },
  { label: "Tous Echeance rappel", icon: Clock },
  { label: "Tous Tranche montant", icon: Wallet },
  { label: "Tous Notes", icon: FileText },
];

export default function LeadsCommandesPage() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [activeRange, setActiveRange] = useState("Maximum");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <h1 className="text-[19px] font-semibold text-gray-900">
              Leads &amp; Commandes
            </h1>
            <p className="text-[13px] text-gray-500">48745 leads au total</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-3.5 w-3.5" />
            Exporter
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
            <Upload className="h-3.5 w-3.5" />
            Importer Excel
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-3.5 w-3.5" />
            Creer commande
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`whitespace-nowrap border-b-2 pb-2.5 text-[13.5px] transition-colors ${
              activeTab === tab.label
                ? "border-gray-900 font-semibold text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[280px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par reference, client ou telephone."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtres
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                activeRange === range
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {range === "Maximum" && <Calendar className="h-3.5 w-3.5" />}
              {range}
            </button>
          ))}
        </div>
      </div>

      {filtersOpen && (
        <div className="mb-4 grid grid-cols-4 gap-3">
          <SelectDropdown
            icon={Truck}
            panelTitle="Expedition"
            pinnedLabel="Tous Expedition"
            options={expeditionStatuses}
          />
          <SelectDropdown
            icon={User}
            panelTitle="Agent assigne"
            pinnedLabel="Non assigne"
            options={agents}
            multi
            searchable
          />

          {staticFilterFields.map((field) => {
            const Icon = field.icon;
            return (
              <button
                key={field.label}
                className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-[12.5px] text-gray-600 hover:bg-gray-50"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <span className="truncate">{field.label}</span>
                </span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              </button>
            );
          })}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-[14px] font-semibold text-gray-900">
                Leads &amp; Commandes
              </p>
              <p className="text-[12.5px] text-gray-500">48745 resultats</p>
            </div>
          </div>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                <th className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className="px-3 py-3">Reference</th>
                <th className="px-3 py-3">Produits</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Source</th>
                <th className="px-3 py-3">Assigne a</th>
                <th className="px-3 py-3">Montant</th>
                <th className="px-3 py-3">Statut</th>
                <th className="px-3 py-3">Expedition</th>
                <th className="px-3 py-3">Date</th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-50 text-[13px] text-gray-700 last:border-0 hover:bg-gray-50/60"
                >
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-800">
                    {lead.reference}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-[10px] font-medium text-gray-400">
                      {lead.productLabel}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-blue-600">{lead.client}</p>
                    <p className="text-[12px] text-gray-400">{lead.phone}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-[12px] font-medium ${sourceBadgeStyles[lead.source]}`}
                    >
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    {lead.assignedTo}
                  </td>
                  <td className="px-3 py-3 font-semibold text-gray-900">
                    {lead.amount}
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[12px] font-medium text-blue-600">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[12px] font-medium text-gray-500">
                      {lead.shipping}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                    {lead.date}
                  </td>
                  <td className="px-3 py-3">
                    <RowActionsMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CreateCommandeModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

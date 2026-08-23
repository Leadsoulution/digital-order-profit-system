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
  Inbox,
  Eye,
  Phone,
  Copy,
  Trash2,
} from "lucide-react";
import {
  leads,
  tabs,
  dateRanges,
  sourceBadgeStyles,
  statusBadgeStyles,
  agents,
  expeditionStatuses,
  sourceOptions,
  productNames,
  attentionLevels,
  reminderDueOptions,
  amountRanges,
  notesOptions,
} from "./leads-data";
import RowActionsMenu from "./RowActionsMenu";
import CreateCommandeModal from "./CreateCommandeModal";
import SelectDropdown from "./SelectDropdown";

export default function LeadsCommandesPage() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [activeRange, setActiveRange] = useState("Maximum");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeTabDef = tabs.find((t) => t.label === activeTab) ?? tabs[0];
  const filteredLeads = activeTabDef.status
    ? leads.filter((lead) => lead.status === activeTabDef.status)
    : leads;

  const query = searchQuery.trim().toLowerCase();
  const visibleLeads = query
    ? filteredLeads.filter(
        (lead) =>
          lead.reference.toLowerCase().includes(query) ||
          lead.client.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      )
    : filteredLeads;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 lg:px-6 lg:py-5">
      <div className="mb-5 hidden items-start justify-between lg:flex">
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

      <div className="mb-4 flex items-center gap-5 overflow-x-auto border-b border-gray-200 lg:gap-6 lg:overflow-visible">
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

      <div className="mb-4 flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-center">
        <div className="relative w-full lg:min-w-[280px] lg:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par reference, client ou telephone."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 lg:w-auto lg:justify-start"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtres
        </button>

        <div className="flex items-center gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible">
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
        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
          <SelectDropdown
            icon={Tag}
            panelTitle="Source"
            pinnedLabel="Tous Source"
            options={sourceOptions}
          />
          <SelectDropdown
            icon={Package}
            panelTitle="Produit"
            pinnedLabel="Tous Produit"
            options={productNames}
            searchable
            searchPlaceholder="Rechercher un produit..."
          />
          <SelectDropdown
            icon={Truck}
            panelTitle="Statut livraison personnalise"
            pinnedLabel="Tous Statut livraison personnalise"
            options={expeditionStatuses}
          />
          <SelectDropdown
            icon={AlertTriangle}
            panelTitle="Attention"
            pinnedLabel="Tous Attention"
            options={attentionLevels}
          />
          <SelectDropdown
            icon={Clock}
            panelTitle="Echeance rappel"
            pinnedLabel="Tous Echeance rappel"
            options={reminderDueOptions}
          />
          <SelectDropdown
            icon={Wallet}
            panelTitle="Tranche montant"
            pinnedLabel="Tous Tranche montant"
            options={amountRanges}
          />
          <SelectDropdown
            icon={FileText}
            panelTitle="Notes"
            pinnedLabel="Tous Notes"
            options={notesOptions}
          />
        </div>
      )}

      <div className="mb-3 flex items-center justify-between lg:hidden">
        <p className="text-[13px] text-gray-500">
          {visibleLeads.length.toLocaleString("fr-FR")} resultats
        </p>
        <label className="flex items-center gap-1.5 text-[12.5px] text-gray-600">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
          Selectionner tout
        </label>
      </div>

      <div className="hidden rounded-xl border border-gray-200 bg-white lg:block">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-[14px] font-semibold text-gray-900">
                Leads &amp; Commandes
              </p>
              <p className="text-[12.5px] text-gray-500">
                {activeTabDef.count.toLocaleString("fr-FR")} resultats
              </p>
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
              {visibleLeads.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Inbox className="h-6 w-6" />
                      <p className="text-[13px]">
                        Aucune commande dans cette categorie.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {visibleLeads.map((lead) => (
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
                    <span
                      className={`rounded-md px-2 py-1 text-[12px] font-medium ${statusBadgeStyles[lead.status]}`}
                    >
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

      <div className="space-y-3 lg:hidden">
        {visibleLeads.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-12 text-gray-400">
            <Inbox className="h-6 w-6" />
            <p className="text-[13px]">Aucune commande dans cette categorie.</p>
          </div>
        )}
        {visibleLeads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-xl border border-gray-200 bg-white p-3.5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${sourceBadgeStyles[lead.source]}`}
                >
                  {lead.source}
                </span>
                <span
                  className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${statusBadgeStyles[lead.status]}`}
                >
                  {lead.status}
                </span>
              </div>
              <RowActionsMenu />
            </div>

            <div className="mb-3 flex gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-medium text-gray-400">
                {lead.productLabel}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-gray-900">
                  {lead.client}
                </p>
                <p className="text-[12.5px] text-gray-400">{lead.phone}</p>
                <p className="mt-1 flex items-center gap-1 text-[12.5px] text-gray-500">
                  <User className="h-3 w-3" />
                  {lead.assignedTo}
                </p>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-md bg-gray-100 px-2 py-1 text-[11.5px] font-medium text-gray-500">
                {lead.shipping}
              </span>
              <span className="text-[16px] font-semibold text-gray-900">
                {lead.amount}
              </span>
            </div>

            <p className="mb-3 text-[12px] text-gray-400">{lead.date}</p>

            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50">
                <Eye className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Voir details</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Appeler</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50">
                <Copy className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Copier numero</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-[12.5px] font-medium text-red-600 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Supprimer commande</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 lg:hidden"
      >
        <Plus className="h-6 w-6" />
      </button>

      {modalOpen && (
        <CreateCommandeModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

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
  UserPlus,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  leads as initialLeads,
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
  type Lead,
  type LeadStatus,
} from "./leads-data";
import RowActionsMenu from "./RowActionsMenu";
import CreateCommandeModal from "./CreateCommandeModal";
import OrderDetailsModal from "./OrderDetailsModal";
import EditOrderModal from "./EditOrderModal";
import ChangeStatusModal from "./ChangeStatusModal";
import AssignModal from "./AssignModal";
import SelectDropdown from "./SelectDropdown";

type ModalState =
  | { type: "create" }
  | { type: "details"; lead: Lead }
  | { type: "edit"; lead: Lead }
  | { type: "status"; leadIds: string[] }
  | { type: "assign"; leadIds: string[] }
  | null;

export default function LeadsCommandesPage() {
  const [leadsState, setLeadsState] = useState<Lead[]>(initialLeads);
  const [activeTab, setActiveTab] = useState("Tous");
  const [activeRange, setActiveRange] = useState("Maximum");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<ModalState>(null);

  const dynamicTabs = tabs.map((tab) => ({
    ...tab,
    count: tab.status
      ? leadsState.filter((lead) => lead.status === tab.status).length
      : leadsState.length,
  }));
  const activeTabDef = dynamicTabs.find((t) => t.label === activeTab) ?? dynamicTabs[0];
  const filteredLeads = activeTabDef.status
    ? leadsState.filter((lead) => lead.status === activeTabDef.status)
    : leadsState;

  const query = searchQuery.trim().toLowerCase();
  const visibleLeads = query
    ? filteredLeads.filter(
        (lead) =>
          lead.reference.toLowerCase().includes(query) ||
          lead.client.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      )
    : filteredLeads;

  const allVisibleSelected =
    visibleLeads.length > 0 && visibleLeads.every((l) => selectedIds.has(l.id));

  function toggleSelectAll() {
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        const next = new Set(prev);
        visibleLeads.forEach((l) => next.delete(l.id));
        return next;
      }
      const next = new Set(prev);
      visibleLeads.forEach((l) => next.add(l.id));
      return next;
    });
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function deleteLead(id: string) {
    setLeadsState((prev) => prev.filter((l) => l.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function applyAssign(agent: string) {
    if (!modal || (modal.type !== "assign")) return;
    const ids = modal.leadIds;
    setLeadsState((prev) =>
      prev.map((l) => (ids.includes(l.id) ? { ...l, assignedTo: agent } : l))
    );
    setSelectedIds(new Set());
    setModal(null);
  }

  function applyStatus(status: string) {
    if (!modal || modal.type !== "status") return;
    const ids = modal.leadIds;
    if (status !== "Aucun changement") {
      setLeadsState((prev) =>
        prev.map((l) =>
          ids.includes(l.id) ? { ...l, status: status as LeadStatus } : l
        )
      );
    }
    setSelectedIds(new Set());
    setModal(null);
  }

  function getRowActions(lead: Lead) {
    return {
      onViewDetails: () => setModal({ type: "details", lead }),
      onEdit: () => setModal({ type: "edit", lead }),
      onCopyReference: () => {
        navigator.clipboard?.writeText(lead.reference);
      },
      onCall: () => {
        window.location.href = `tel:${lead.phone}`;
      },
      onCopyContact: () => {
        navigator.clipboard?.writeText(lead.phone);
      },
      onAssign: () => setModal({ type: "assign", leadIds: [lead.id] }),
      onChangeStatus: () => setModal({ type: "status", leadIds: [lead.id] }),
      onDelete: () => deleteLead(lead.id),
    };
  }

  const selectedCount = selectedIds.size;

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto bg-gray-50 px-4 py-4 lg:px-6 lg:py-5">
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
            onClick={() => setModal({ type: "create" })}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-3.5 w-3.5" />
            Creer commande
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-5 overflow-x-auto border-b border-gray-200 lg:gap-6 lg:overflow-visible">
        {dynamicTabs.map((tab) => (
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
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded border-gray-300"
          />
          Selectionner tout
        </label>
      </div>

      <div className="hidden rounded-xl border border-gray-200 bg-white lg:block">
        {selectedCount > 0 ? (
          <div className="flex items-center justify-between border-b border-gray-100 bg-blue-50/60 px-5 py-3">
            <p className="text-[13px] font-medium text-blue-700">
              {selectedCount} selectionne{selectedCount > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setModal({ type: "assign", leadIds: Array.from(selectedIds) })
                }
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Assigner
              </button>
              <button
                onClick={() =>
                  setModal({ type: "status", leadIds: Array.from(selectedIds) })
                }
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Changer statut
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="flex items-center gap-1 px-2 py-1.5 text-[12.5px] font-medium text-gray-500 hover:text-gray-700"
              >
                <X className="h-3.5 w-3.5" />
                Deselectionner
              </button>
            </div>
          </div>
        ) : (
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
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-gray-300"
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                <th className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
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
                      checked={selectedIds.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
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
                    <RowActionsMenu {...getRowActions(lead)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <p className="text-[12px] text-gray-500">
            {visibleLeads.length > 0 ? 1 : 0}-{visibleLeads.length} /{" "}
            {visibleLeads.length} resultats
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-300"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-[12px] text-gray-600">Page 1 / 1</span>
            <button
              disabled
              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-300"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {visibleLeads.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-12 text-gray-400">
            <Inbox className="h-6 w-6" />
            <p className="text-[13px]">Aucune commande dans cette categorie.</p>
          </div>
        )}
        {visibleLeads.map((lead) => {
          const actions = getRowActions(lead);
          return (
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
                <RowActionsMenu {...actions} />
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
                <button
                  onClick={actions.onViewDetails}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Voir details</span>
                </button>
                <button
                  onClick={actions.onCall}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Appeler</span>
                </button>
                <button
                  onClick={actions.onCopyContact}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Copier numero</span>
                </button>
                <button
                  onClick={actions.onDelete}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2 text-[12.5px] font-medium text-white hover:bg-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Supprimer commande</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setModal({ type: "create" })}
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 lg:hidden"
      >
        <Plus className="h-6 w-6" />
      </button>

      {modal?.type === "create" && (
        <CreateCommandeModal onClose={() => setModal(null)} />
      )}
      {modal?.type === "details" && (
        <OrderDetailsModal
          lead={modal.lead}
          onClose={() => setModal(null)}
          onEdit={() => setModal({ type: "edit", lead: modal.lead })}
        />
      )}
      {modal?.type === "edit" && (
        <EditOrderModal
          lead={modal.lead}
          onClose={() => setModal(null)}
          onSave={() => setModal(null)}
        />
      )}
      {modal?.type === "status" && (
        <ChangeStatusModal
          count={modal.leadIds.length}
          onClose={() => setModal(null)}
          onApply={applyStatus}
        />
      )}
      {modal?.type === "assign" && (
        <AssignModal
          count={modal.leadIds.length}
          onClose={() => setModal(null)}
          onApply={applyAssign}
        />
      )}
    </div>
  );
}

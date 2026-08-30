"use client";

import { useState } from "react";
import {
  Eye,
  FileSpreadsheet,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  TrendingUp,
  Truck,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import Sparkline from "./Sparkline";
import SelectDropdown from "./SelectDropdown";
import CreateUserModal from "./CreateUserModal";
import { teamMembers, roleOptions, statusOptions } from "./users-data";

export default function UtilisateursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const visibleMembers = query
    ? teamMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.phone.includes(query)
      )
    : teamMembers;

  const totalUsers = teamMembers.length;
  const activeUsers = teamMembers.filter((m) => m.status === "Actif").length;
  const activePct = Math.round((activeUsers / totalUsers) * 100);
  const agentsCount = teamMembers.filter((m) => m.role === "Agent").length;
  const adminsCount = teamMembers.filter((m) => m.role === "Admin").length;
  const agentRates = teamMembers
    .filter((m) => m.role === "Agent" && m.tauxConv !== null)
    .map((m) => m.tauxConv as number);
  const avgConvRate = Math.round(
    agentRates.reduce((sum, r) => sum + r, 0) / agentRates.length
  );

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto bg-gray-50 px-4 py-4 lg:px-6 lg:py-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <Users className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <h1 className="text-h1 font-semibold text-gray-900">
              Utilisateurs
            </h1>
            <p className="text-[13px] text-gray-500">
              <span className="font-mono">{agentsCount}</span> membres de l&apos;equipe
            </p>
          </div>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter utilisateur
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-3.5">
          <div className="mb-2 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                Total utilisateurs
              </p>
              <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                <TrendingUp className="h-2.5 w-2.5" />
                +1
              </span>
            </div>
            <Users className="h-4 w-4 shrink-0 text-blue-400" />
          </div>
          <p className="font-mono text-[19px] font-semibold text-gray-900">
            {totalUsers}
          </p>
          <p className="mb-1 text-[11px] text-gray-400">ce mois</p>
          <Sparkline data={[3, 4, 4, 5, 6, 8, 9]} positive width={160} height={30} />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-3.5">
          <div className="mb-2 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                Utilisateurs actifs
              </p>
              <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                <TrendingUp className="h-2.5 w-2.5" />
                {activePct}%
              </span>
            </div>
            <UserCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          </div>
          <p className="font-mono text-[19px] font-semibold text-gray-900">
            {activeUsers}
          </p>
          <p className="mb-1 text-[11px] text-gray-400">actuellement actifs</p>
          <Sparkline data={[6, 6, 7, 7, 8, 9, 9]} positive width={160} height={30} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3.5">
          <div className="mb-2 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                Agents / Admins
              </p>
              <span className="flex items-center gap-0.5 rounded-full bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-600">
                <TrendingUp className="h-2.5 w-2.5" />
                Equilibre
              </span>
            </div>
            <UserCog className="h-4 w-4 shrink-0 text-violet-400" />
          </div>
          <p className="font-mono text-[19px] font-semibold text-gray-900">
            {agentsCount} / {adminsCount}
          </p>
          <p className="text-[11px] text-gray-400">repartition equipe</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-3.5">
          <div className="mb-2 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                Conv. moyenne agents
              </p>
              <span className="flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                &mdash; -0
              </span>
            </div>
            <TrendingUp className="h-4 w-4 shrink-0 text-pink-400" />
          </div>
          <p className="font-mono text-[19px] font-semibold text-gray-900">
            {avgConvRate}%
          </p>
          <p className="mb-1 text-[11px] text-gray-400">vs sem. dern.</p>
          <Sparkline data={[5, 6, 5, 7, 6, 8, 7]} positive width={160} height={30} />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-center">
        <div className="relative w-full lg:min-w-[280px] lg:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, email ou telephone..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 lg:w-auto"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtres
        </button>
      </div>

      {filtersOpen && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectDropdown pinnedLabel="Tous les roles" options={roleOptions} />
          <SelectDropdown pinnedLabel="Tous les statuts" options={statusOptions} />
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="text-h3 font-semibold text-gray-900">Equipe</p>
          <p className="text-[12.5px] text-gray-500">
            <span className="font-mono">{visibleMembers.length}</span> membres
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3">Utilisateur</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Statut</th>
                <th className="px-3 py-3">Permissions</th>
                <th className="px-3 py-3">Leads assignes</th>
                <th className="px-3 py-3">Confirmes ajd.</th>
                <th className="px-3 py-3">Taux conv.</th>
                <th className="px-3 py-3">Derniere connexion</th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-50 text-[13px] text-gray-700 last:border-0 hover:bg-gray-50/60"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${member.avatarColor}`}
                      >
                        {member.name
                          .split(" ")
                          .map((p) => p.charAt(0).toUpperCase())
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-800">
                          {member.name}
                        </p>
                        <p className="truncate text-[12px] text-gray-400">
                          {member.email}
                        </p>
                        <p className="truncate font-mono text-[12px] text-gray-400">
                          {member.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium ${
                        member.role === "Admin"
                          ? "bg-violet-50 text-violet-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <UserCog className="h-3 w-3" />
                      {member.role}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium ${
                        member.status === "Actif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <UserCheck className="h-3 w-3" />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      {member.permissions.suiviLivraison && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-teal-600">
                          <Truck className="h-3 w-3" />
                        </span>
                      )}
                      {member.permissions.importsExcel && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                          <FileSpreadsheet className="h-3 w-3" />
                        </span>
                      )}
                      {member.permissions.creationProspects && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                          <UserPlus className="h-3 w-3" />
                        </span>
                      )}
                      <button className="flex h-6 w-6 items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-400 hover:bg-gray-50">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono text-gray-700">
                    {member.leadsAssignes ?? "—"}
                  </td>
                  <td className="px-3 py-3 font-mono text-emerald-600">
                    {member.confirmesAjd ?? "—"}
                  </td>
                  <td className="px-3 py-3 font-mono text-gray-700">
                    {member.tauxConv !== null ? `${member.tauxConv}%` : "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-gray-500">
                    {member.derniereConnexion}
                  </td>
                  <td
                    className="relative px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId((v) => (v === member.id ? null : member.id))
                      }
                      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {openMenuId === member.id && (
                      <div className="absolute right-3 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        <button
                          onClick={() => setOpenMenuId(null)}
                          className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="h-3.5 w-3.5 text-gray-400" />
                          Voir details
                        </button>
                        <button
                          onClick={() => setOpenMenuId(null)}
                          className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil className="h-3.5 w-3.5 text-gray-400" />
                          Modifier
                        </button>
                        <div className="mt-1 border-t border-gray-100 pt-1">
                          <button
                            onClick={() => setOpenMenuId(null)}
                            className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {createOpen && <CreateUserModal onClose={() => setCreateOpen(false)} />}
    </div>
  );
}

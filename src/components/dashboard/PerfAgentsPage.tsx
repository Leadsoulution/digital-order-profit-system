"use client";

import { useState } from "react";
import {
  Activity,
  ChevronRight,
  Clock,
  PhoneCall,
  PhoneOff,
  RefreshCw,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import AgentLiveDetailModal from "./AgentLiveDetailModal";
import { liveAgentStats, globalStats, type LiveAgentStat } from "./perf-agents-data";

const kpiRows = [
  [
    { label: "Agents actifs", value: globalStats.agentsActifs, icon: Users },
    {
      label: "Commandes assignees",
      value: globalStats.commandesAssignees.toLocaleString("fr-FR"),
      subtitle: "toutes assignations",
      icon: UserCheck,
    },
    {
      label: "En cours",
      value: globalStats.enCours.toLocaleString("fr-FR"),
      icon: Clock,
    },
    {
      label: "Confirmes",
      value: globalStats.confirmes.toLocaleString("fr-FR"),
      icon: RefreshCw,
    },
  ],
  [
    {
      label: "Rappels",
      value: globalStats.rappels.toLocaleString("fr-FR"),
      subtitle: "actuellement au rappel",
      icon: PhoneCall,
    },
    {
      label: "Sans reponse",
      value: globalStats.sansReponse.toString(),
      subtitle: "sans reponse aujourd'hui",
      icon: PhoneOff,
    },
    {
      label: "Leads contactes",
      value: globalStats.leadsContactes.toString(),
      icon: Activity,
    },
    {
      label: "Taux de conversion",
      value: globalStats.tauxConversion,
      icon: Target,
    },
  ],
];

export default function PerfAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<LiveAgentStat | null>(null);

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto bg-gray-50 px-4 py-4 lg:px-6 lg:py-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <Activity className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <h1 className="text-h1 font-semibold text-gray-900">
              Performance des agents
            </h1>
            <p className="max-w-md text-[13px] text-gray-500">
              Vue d&apos;etat de file en temps reel pour piloter l&apos;activite
              recente, depuis les donnees de confirmation.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
          <RefreshCw className="h-3.5 w-3.5" />
          Actualiser
        </button>
      </div>

      <div className="mb-5 space-y-3">
        {kpiRows.map((row, i) => (
          <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {row.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                      {kpi.label}
                    </p>
                    <p className="font-mono text-[19px] font-semibold text-gray-900">
                      {kpi.value}
                    </p>
                    {"subtitle" in kpi && kpi.subtitle && (
                      <p className="truncate text-[11px] text-gray-400">
                        {kpi.subtitle}
                      </p>
                    )}
                  </div>
                  <Icon className="h-4 w-4 shrink-0 text-gray-300" />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="text-[14px] font-semibold text-gray-900">
            Detail par agent &middot; totaux live
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3">Agent</th>
                <th className="px-3 py-3">Statut du compte</th>
                <th className="px-3 py-3">Assignes</th>
                <th className="px-3 py-3">En cours</th>
                <th className="px-3 py-3">Rappels</th>
                <th className="px-3 py-3">Confirmes</th>
                <th className="px-3 py-3">Contactes</th>
                <th className="px-3 py-3">Conversion</th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {liveAgentStats.map((agent) => {
                const initial = agent.name.trim().charAt(0).toUpperCase();
                return (
                  <tr
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent)}
                    className="cursor-pointer border-b border-gray-50 text-[13px] text-gray-700 last:border-0 hover:bg-gray-50/60"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${agent.avatarColor}`}
                        >
                          {initial}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-800">
                            {agent.name}
                          </p>
                          <p className="truncate text-[11.5px] text-gray-400">
                            {agent.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11.5px] font-medium text-emerald-600">
                        Compte actif
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono font-medium text-gray-800">
                      {agent.assignes.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-3 py-3 font-mono text-gray-600">
                      {agent.enCours.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-3 py-3 font-mono font-medium text-orange-500">
                      {agent.rappels.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-3 py-3 font-mono font-medium text-emerald-600">
                      {agent.confirmes.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-3 py-3 font-mono text-gray-500">
                      {agent.contactes}
                    </td>
                    <td className="px-3 py-3 font-mono text-gray-500">
                      {agent.conversion.toFixed(1)}%
                    </td>
                    <td className="px-3 py-3 text-right">
                      <ChevronRight className="ml-auto h-4 w-4 text-gray-300" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAgent && (
        <AgentLiveDetailModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}

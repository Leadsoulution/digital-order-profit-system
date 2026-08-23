"use client";

import { useState } from "react";
import {
  Settings2,
  RefreshCw,
  Save,
  Calendar,
  Clock,
  Plus,
  Pencil,
  Trash2,
  ArrowRight,
  User,
} from "lucide-react";
import DonutRing from "./DonutRing";
import AgentPerformanceCard from "./AgentPerformanceCard";
import Toggle from "./Toggle";
import SelectDropdown from "./SelectDropdown";
import {
  agentPerformance,
  rebalanceModes,
  percentageRules,
  sourceKeyOptions,
  sourceRules,
  excludedFromReassignment,
} from "./confirmation-data";
import { agents } from "./leads-data";

const dateRanges = [
  "Aujourd'hui",
  "7 derniers jours",
  "Ce mois-ci",
  "Maximum",
  "Personnalisee",
];

export default function ConfirmationPage() {
  const [activeTab, setActiveTab] = useState<"performance" | "parametres">(
    "performance"
  );
  const [activeRange, setActiveRange] = useState("Maximum");
  const [activeMode, setActiveMode] = useState(rebalanceModes[0]);
  const [autoAssign, setAutoAssign] = useState(true);
  const [autoReassign, setAutoReassign] = useState(true);
  const [dedupDetection, setDedupDetection] = useState(true);
  const [excluded, setExcluded] = useState<string[]>(excludedFromReassignment);

  const globalRate = 72;
  const totalPercent = percentageRules.reduce((sum, r) => sum + r.percent, 0);

  function toggleExcluded(name: string) {
    setExcluded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 lg:px-6 lg:py-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <Settings2 className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <h1 className="text-[19px] font-semibold text-gray-900">
              Gestion de la confirmation
            </h1>
            <p className="text-[13px] text-gray-500">
              Configurez les regles d&apos;assignation et suivez la performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
            <RefreshCw className="h-3.5 w-3.5" />
            Reequilibrer
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-gray-800">
            <Save className="h-3.5 w-3.5" />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("performance")}
          className={`whitespace-nowrap border-b-2 pb-2.5 text-[13.5px] transition-colors ${
            activeTab === "performance"
              ? "border-gray-900 font-semibold text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Performance agents
        </button>
        <button
          onClick={() => setActiveTab("parametres")}
          className={`whitespace-nowrap border-b-2 pb-2.5 text-[13.5px] transition-colors ${
            activeTab === "parametres"
              ? "border-gray-900 font-semibold text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Parametres
        </button>
      </div>

      {activeTab === "performance" ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
              <DonutRing percent={globalRate} size={32} strokeWidth={4} />
              <p className="text-[12px] text-gray-500">
                Taux de
                <br />
                confirmation
              </p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Clock className="h-4.5 w-4.5 text-blue-500" />
              </div>
              <div>
                <p className="text-[19px] font-semibold text-gray-900">
                  34h 27m
                </p>
                <p className="text-[12.5px] text-gray-500">
                  Temps de reponse moyen
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
                <Clock className="h-4.5 w-4.5 text-violet-500" />
              </div>
              <div>
                <p className="text-[19px] font-semibold text-gray-900">
                  1h 39m
                </p>
                <p className="text-[12.5px] text-gray-500">
                  Temps de premiere reponse
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agentPerformance.map((agent) => (
              <AgentPerformanceCard key={agent.name} agent={agent} />
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-3xl space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                  MODE ACTIF &mdash; {activeMode.toUpperCase()}
                </p>
                <p className="mt-1 text-[12.5px] text-gray-500">
                  {activeMode === "Par pourcentage" &&
                    "Repartissez les nouvelles assignations entre les agents actifs avec des poids."}
                  {activeMode === "Par produit" &&
                    "Faites correspondre le produit selectionne au catalogue admin. Chaque produit cible peut avoir un agent qui recoit les commandes correspondantes."}
                  {activeMode === "Par source" &&
                    "Faites correspondre la source a un agent. La regle assignera les commandes entrantes de cette source a l'agent configure."}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-1">
                {rebalanceModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`whitespace-nowrap rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                      activeMode === mode
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-semibold text-gray-800">
                Regles pour ce mode
              </p>
              {activeMode === "Par pourcentage" && (
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">
                    Expliquer
                  </button>
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">
                    Reinitialiser
                  </button>
                </div>
              )}
              {activeMode !== "Par pourcentage" && (
                <button className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50">
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter une regle
                </button>
              )}
            </div>

            {activeMode === "Par pourcentage" && (
              <div className="space-y-3">
                {percentageRules.map((rule) => (
                  <div key={rule.name} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${rule.avatarColor}`}
                    >
                      {rule.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="w-32 shrink-0 truncate text-[12.5px] text-gray-700">
                      {rule.name}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      defaultValue={rule.weight}
                      className="h-1.5 flex-1 cursor-pointer accent-gray-900"
                    />
                    <span className="w-6 shrink-0 text-right text-[12.5px] text-gray-500">
                      {rule.weight}
                    </span>
                    <span className="w-10 shrink-0 text-right text-[12.5px] font-medium text-gray-700">
                      {rule.percent}%
                    </span>
                  </div>
                ))}
                <div
                  className={`mt-3 rounded-lg px-3 py-2 text-center text-[12.5px] font-medium ${
                    totalPercent === 100
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {totalPercent}% &middot; Total reparti
                </div>
              </div>
            )}

            {activeMode === "Par produit" && (
              <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-[12.5px] text-gray-400">
                Aucune regle pour ce mode
              </div>
            )}

            {activeMode === "Par source" && (
              <div className="space-y-2">
                <SelectDropdown
                  variant="field"
                  pinnedLabel="Selectionner une source"
                  options={sourceKeyOptions}
                  searchable
                  searchPlaceholder="Rechercher une source..."
                />
                <div className="space-y-2 pt-1">
                  {sourceRules.map((rule) => (
                    <div
                      key={rule.source}
                      className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 text-[12.5px] text-gray-700">
                        <span className="rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600">
                          {rule.source}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-medium">{rule.agent}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-1 text-[13px] font-semibold text-gray-800">
              Regles automatiques
            </p>
            <div className="divide-y divide-gray-100">
              <Toggle
                checked={autoAssign}
                onChange={() => setAutoAssign((v) => !v)}
                label="Auto-assignation"
                description="Assigner automatiquement les nouveaux leads"
              />
              <Toggle
                checked={autoReassign}
                onChange={() => setAutoReassign((v) => !v)}
                label="Reassignation automatique des non-reponses"
                description="Controle le retour en file, la limite de tentatives et le transfert entre agents"
              />
            </div>

            {autoReassign && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 p-3">
                  <label className="mb-1 block text-[12px] font-medium text-gray-600">
                    Retour en file
                  </label>
                  <input
                    type="number"
                    defaultValue={90}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">
                    Temps avant qu&apos;une commande soit remise en file si
                    l&apos;agent ne repond pas
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <label className="mb-1 block text-[12px] font-medium text-gray-600">
                    Tentatives agent
                  </label>
                  <input
                    type="number"
                    defaultValue={3}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">
                    Nombre de tentatives de contact par agent avant de
                    reassigner
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <label className="mb-1 block text-[12px] font-medium text-gray-600">
                    Transfert equipe
                  </label>
                  <input
                    type="number"
                    defaultValue={18}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">
                    Temps de passage au groupe suivant apres plusieurs
                    tentatives
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-[13px] font-semibold text-gray-800">
              Agents exclus de la reassignation
            </p>
            <p className="mb-3 text-[12px] text-gray-500">
              Les agents coches ne recevront pas de leads reassignes
              automatiquement entre agents
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {agents.map((name) => (
                <label
                  key={name}
                  className="flex items-center gap-2 text-[12.5px] text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={excluded.includes(name)}
                    onChange={() => toggleExcluded(name)}
                    className="h-3.5 w-3.5 rounded border-gray-300"
                  />
                  <span className="truncate">{name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <Toggle
              checked={dedupDetection}
              onChange={() => setDedupDetection((v) => !v)}
              label="Detection de doublons"
              description="Marquer les leads en doublon automatiquement"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-1.5 text-[13px] font-semibold text-gray-800">
              <User className="h-3.5 w-3.5 text-gray-400" />
              Agent de secours
            </p>
            <p className="mb-3 text-[12px] text-gray-500">
              Utilise cet agent systematiquement si aucune regle ne
              correspond ou si aucun agent n&apos;est configure
            </p>
            <SelectDropdown
              variant="field"
              pinnedLabel="Fatima Zahra"
              options={agents}
            />
          </div>
        </div>
      )}
    </div>
  );
}

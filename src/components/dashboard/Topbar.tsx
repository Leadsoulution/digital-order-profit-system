"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  CheckCircle2,
  PackageCheck,
  Moon,
  Bell,
  ChevronDown,
} from "lucide-react";
import { leads, type Lead } from "./leads-data";

function formatPhone(phone: string) {
  return phone.startsWith("0") ? `+212${phone.slice(1)}` : phone;
}

function SearchResultsPanel({
  results,
  onSelect,
}: {
  results: Lead[];
  onSelect: (lead: Lead) => void;
}) {
  return (
    <div className="absolute left-0 top-full z-30 mt-1 w-full min-w-[280px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
      <p className="px-3 pb-1.5 text-[10.5px] font-semibold tracking-wide text-gray-400">
        RESULTATS
      </p>
      {results.map((lead) => (
        <button
          key={lead.id}
          onClick={() => onSelect(lead)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-50"
        >
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-gray-800">
              {lead.reference}
            </p>
            <p className="truncate text-[12px] text-gray-400">
              {lead.client} - {formatPhone(lead.phone)}
            </p>
          </div>
          <span className="shrink-0 text-[10.5px] font-medium uppercase tracking-wide text-gray-400">
            {lead.status}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const results = query.trim()
    ? leads
        .filter(
          (lead) =>
            lead.reference.toLowerCase().includes(query.toLowerCase()) ||
            lead.client.toLowerCase().includes(query.toLowerCase()) ||
            lead.phone.includes(query)
        )
        .slice(0, 5)
    : [];

  const showResults = focused && results.length > 0;

  function selectResult(lead: Lead) {
    setQuery("");
    setFocused(false);
    setMobileSearchOpen(false);
    router.push(`/?lead=${lead.id}`);
  }

  return (
    <header className="shrink-0 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center gap-2 px-4 lg:gap-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden w-full max-w-md lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Rechercher leads, produits, commandes..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-14 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10.5px] font-medium text-gray-400">
            Ctrl K
          </span>
          {showResults && (
            <SearchResultsPanel results={results} onSelect={selectResult} />
          )}
        </div>

        <button
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 lg:hidden"
        >
          <Search className="h-5 w-5" />
        </button>

        <div className="ml-auto flex items-center gap-1 lg:gap-2.5">
          <div className="hidden items-center gap-2.5 lg:flex">
            <div className="relative flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[13px] font-medium text-blue-700">
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="font-mono">48745</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-green-100 bg-green-50 px-2.5 py-1.5 text-[13px] font-medium text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="font-mono">31327</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 text-[13px] font-medium text-orange-700">
              <PackageCheck className="h-3.5 w-3.5" />
              <span className="font-mono">22869</span>
            </div>
          </div>

          <button className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 lg:ml-1.5">
            FR
            <ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 lg:block" />
          </button>

          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-50">
            <Moon className="h-[18px] w-[18px]" />
          </button>

          <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-50">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 font-mono text-[9px] font-semibold text-white">
              2
            </span>
          </button>

          <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-1.5 hover:bg-gray-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[12px] font-semibold text-white">
              MA
            </span>
            <span className="hidden text-[13px] font-medium text-gray-700 lg:inline">
              Mohamed Alaoui
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 lg:block" />
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-gray-100 px-4 py-2.5 lg:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Rechercher leads, produits, commandes..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
            />
            {showResults && (
              <SearchResultsPanel results={results} onSelect={selectResult} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

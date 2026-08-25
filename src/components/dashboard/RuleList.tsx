"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import SelectDropdown from "./SelectDropdown";
import { agents } from "./leads-data";
import type { AssignedRule } from "./confirmation-data";

type RuleOption = {
  label: string;
  sublabel?: string;
};

export default function RuleList({
  rules,
  onChange,
  options,
  emptyText,
  searchPlaceholder,
}: {
  rules: AssignedRule[];
  onChange: (rules: AssignedRule[]) => void;
  options: RuleOption[];
  emptyText: string;
  searchPlaceholder: string;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  function addRule(option: RuleOption) {
    nextId.current += 1;
    onChange([
      ...rules,
      {
        id: `${option.label}-${nextId.current}`,
        label: option.label,
        sublabel: option.sublabel,
        agent: agents[0],
      },
    ]);
    setPickerOpen(false);
    setQuery("");
  }

  function removeRule(id: string) {
    onChange(rules.filter((r) => r.id !== id));
  }

  function reassign(id: string, agent: string) {
    onChange(rules.map((r) => (r.id === id ? { ...r, agent } : r)));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-gray-800">
          Regles pour ce mode
        </p>
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter une regle
          </button>

          {pickerOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="relative border-b border-gray-100 p-2">
                <Search className="pointer-events-none absolute left-4.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-gray-200 py-1.5 pl-7 pr-2 text-[12.5px] text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                {filteredOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => addRule(option)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[12.5px] text-gray-700 hover:bg-gray-50"
                  >
                    <span className="truncate">{option.label}</span>
                    {option.sublabel && (
                      <span className="shrink-0 truncate text-[11px] text-gray-400">
                        {option.sublabel}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {rules.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-[12.5px] text-gray-400">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-gray-700">
                  {rule.label}
                </p>
                {rule.sublabel && (
                  <p className="truncate text-[11px] text-gray-400">
                    {rule.sublabel}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="w-40">
                  <SelectDropdown
                    variant="field"
                    pinnedLabel={rule.agent}
                    options={agents}
                    value={rule.agent}
                    onSelect={(agent) => reassign(rule.id, agent)}
                  />
                </div>
                <button
                  onClick={() => removeRule(rule.id)}
                  className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

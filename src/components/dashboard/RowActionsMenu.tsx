"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Eye,
  Pencil,
  Copy,
  Phone,
  Contact,
  UserPlus,
  RefreshCw,
  Trash2,
} from "lucide-react";

const menuGroups = [
  [
    { label: "Voir details", icon: Eye },
    { label: "Modifier les details", icon: Pencil },
    { label: "Copier la reference", icon: Copy },
    { label: "Appeler", icon: Phone },
    { label: "Copier le contact", icon: Contact },
  ],
  [
    { label: "Assigner", icon: UserPlus },
    { label: "Changer statut", icon: RefreshCw },
  ],
];

export default function RowActionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {menuGroups.map((group, i) => (
            <div
              key={i}
              className={i > 0 ? "border-t border-gray-100 py-1" : "py-1"}
            >
              {group.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="border-t border-gray-100 pt-1">
            <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

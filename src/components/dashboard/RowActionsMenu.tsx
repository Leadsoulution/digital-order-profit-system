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
  Truck,
  Bike,
} from "lucide-react";

type RowActionsMenuProps = {
  onViewDetails: () => void;
  onEdit: () => void;
  onCopyReference: () => void;
  onCall: () => void;
  onCopyContact: () => void;
  onAssign: () => void;
  onChangeStatus: () => void;
  onSetDeliverer: () => void;
  onDelete: () => void;
  onSendToForceLog?: () => void;
};

export default function RowActionsMenu({
  onViewDetails,
  onEdit,
  onCopyReference,
  onCall,
  onCopyContact,
  onAssign,
  onChangeStatus,
  onSetDeliverer,
  onDelete,
  onSendToForceLog,
}: RowActionsMenuProps) {
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

  const menuGroups = [
    [
      { label: "Voir details", icon: Eye, onClick: onViewDetails },
      { label: "Modifier les details", icon: Pencil, onClick: onEdit },
      { label: "Copier la reference", icon: Copy, onClick: onCopyReference },
      { label: "Appeler", icon: Phone, onClick: onCall },
      { label: "Copier le contact", icon: Contact, onClick: onCopyContact },
    ],
    [
      { label: "Assigner", icon: UserPlus, onClick: onAssign },
      { label: "Changer statut", icon: RefreshCw, onClick: onChangeStatus },
      { label: "Livreur et livraison", icon: Bike, onClick: onSetDeliverer },
      ...(onSendToForceLog
        ? [{ label: "Envoyer vers ForceLog", icon: Truck, onClick: onSendToForceLog }]
        : []),
    ],
  ];

  function runAndClose(action: () => void) {
    action();
    setOpen(false);
  }

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
                    onClick={() => runAndClose(item.onClick)}
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
            <button
              onClick={() => runAndClose(onDelete)}
              className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

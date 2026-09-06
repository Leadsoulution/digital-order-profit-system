"use client";

import {
  FileSpreadsheet,
  Mail,
  Phone,
  Truck,
  UserCheck,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import type { TeamMember } from "./users-data";

export default function UserDetailModal({
  member,
  onClose,
  onEdit,
}: {
  member: TeamMember;
  onClose: () => void;
  onEdit: () => void;
}) {
  const initials = member.name
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  const permissionList = [
    { key: "suiviLivraison", label: "Acces suivi livraison", icon: Truck },
    { key: "importsExcel", label: "Acces imports Excel", icon: FileSpreadsheet },
    { key: "creationProspects", label: "Acces creation prospects", icon: UserPlus },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 sm:px-4 sm:py-10">
      <div className="flex h-full w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-w-sm sm:rounded-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white ${member.avatarColor}`}
            >
              {initials}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-h2 font-semibold text-gray-900">
                {member.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  member.role === "Admin"
                    ? "bg-violet-50 text-violet-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <UserCog className="h-3 w-3" />
                {member.role}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="space-y-2 rounded-lg border border-gray-100 p-3">
            <p className="flex items-center gap-2 text-[13px] text-gray-700">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              {member.email}
            </p>
            <p className="flex items-center gap-2 font-mono text-[13px] text-gray-700">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              {member.phone}
            </p>
            <p className="flex items-center gap-2 text-[13px] text-gray-700">
              <UserCheck className="h-3.5 w-3.5 text-gray-400" />
              <span
                className={
                  member.status === "Actif" ? "text-emerald-600" : "text-gray-500"
                }
              >
                {member.status}
              </span>
            </p>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              PERMISSIONS
            </p>
            <div className="space-y-1.5">
              {permissionList.map((perm) => {
                const Icon = perm.icon;
                const enabled = member.permissions[perm.key];
                return (
                  <div
                    key={perm.key}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12.5px] ${
                      enabled ? "bg-gray-50 text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1">{perm.label}</span>
                    <span
                      className={`text-[11px] font-medium ${
                        enabled ? "text-emerald-600" : "text-gray-300"
                      }`}
                    >
                      {enabled ? "Active" : "Desactive"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {member.role === "Agent" && (
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md bg-purple-50 px-2 py-1.5 text-center">
                <p className="font-mono text-[13px] font-semibold text-purple-700">
                  {member.leadsAssignes ?? "—"}
                </p>
                <p className="text-[10px] text-purple-500">Assignes</p>
              </div>
              <div className="rounded-md bg-emerald-50 px-2 py-1.5 text-center">
                <p className="font-mono text-[13px] font-semibold text-emerald-700">
                  {member.confirmesAjd ?? "—"}
                </p>
                <p className="text-[10px] text-emerald-600">Confirmes ajd.</p>
              </div>
              <div className="rounded-md bg-blue-50 px-2 py-1.5 text-center">
                <p className="font-mono text-[13px] font-semibold text-blue-700">
                  {member.tauxConv !== null ? `${member.tauxConv}%` : "—"}
                </p>
                <p className="text-[10px] text-blue-500">Taux conv.</p>
              </div>
            </div>
          )}

          <p className="text-[11.5px] text-gray-400">
            Derniere connexion :{" "}
            <span className="font-mono">{member.derniereConnexion}</span>
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Fermer
          </button>
          <button
            onClick={onEdit}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

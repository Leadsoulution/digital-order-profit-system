"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  FileSpreadsheet,
  PhoneCall,
  Activity,
  Store,
  Package,
  Image as ImageIcon,
  Megaphone,
  Puzzle,
  Truck,
  Boxes,
  Users,
  Wallet,
  UserCog,
  BarChart2,
  LogOut,
  X,
} from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "PRINCIPAL",
    items: [
      { label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Leads / Commandes", icon: ShoppingCart, href: "/" },
      { label: "Imports Excel", icon: FileSpreadsheet },
      { label: "Confirmation", icon: PhoneCall, href: "/confirmation" },
      { label: "Perf. Agents", icon: Activity, href: "/perf-agents" },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Pages & Boutiques", icon: Store },
      { label: "Produits", icon: Package, href: "/products" },
      { label: "Media", icon: ImageIcon },
      { label: "Publicite", icon: Megaphone },
      { label: "Integrations", icon: Puzzle, href: "/integrations" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Expedition", icon: Truck },
      { label: "Inventaire", icon: Boxes },
      { label: "Fournisseurs", icon: Users, href: "/fournisseurs" },
    ],
  },
  {
    title: "GESTION",
    items: [
      { label: "Finance", icon: Wallet, href: "/finance" },
      { label: "Utilisateurs", icon: UserCog, href: "/utilisateurs" },
      { label: "Rapports", icon: BarChart2 },
    ],
  },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[248px] shrink-0 flex-col bg-[#0B1120] text-slate-300 transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex items-center justify-between gap-2.5 px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold text-white">Lead2Door</p>
            <p className="text-[11px] text-slate-500">From Lead to Door</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200 lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="scrollbar-hide flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-1.5 px-3 text-[10.5px] font-semibold tracking-wider text-slate-500">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = item.href === pathname;
                const className = `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`;
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link href={item.href} onClick={onClose} className={className}>
                        <Icon className="h-[17px] w-[17px] shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <div className={`${className} cursor-default`}>
                        <Icon className="h-[17px] w-[17px] shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/5 px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-slate-400">
          <LogOut className="h-[17px] w-[17px]" />
          <span>Deconnexion</span>
        </div>
      </div>
      </aside>
    </>
  );
}

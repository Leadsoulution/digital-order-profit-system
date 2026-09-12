"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  PhoneCall,
  Activity,
  Package,
  Puzzle,
  Users,
  Wallet,
  UserCog,
  MapPin,
  Settings,
  LogOut,
  Loader2,
  X,
} from "lucide-react";
import type { ComponentType } from "react";
import { useSignOut } from "@/components/auth/useSignOut";

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
      { label: "Confirmation", icon: PhoneCall, href: "/confirmation" },
      { label: "Perf. Agents", icon: Activity, href: "/perf-agents" },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Produits", icon: Package, href: "/products" },
      { label: "Integrations", icon: Puzzle, href: "/integrations" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [{ label: "Fournisseurs", icon: Users, href: "/fournisseurs" }],
  },
  {
    title: "DONNEES MAITRES",
    items: [{ label: "Villes de livraison", icon: MapPin, href: "/villes" }],
  },
  {
    title: "GESTION",
    items: [
      { label: "Finance", icon: Wallet, href: "/finance" },
      { label: "Utilisateurs", icon: UserCog, href: "/utilisateurs" },
      { label: "Parametres", icon: Settings, href: "/parametres" },
    ],
  },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { signOut, signingOut } = useSignOut();

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
        {/*
          Le fond du logo a ete detoure : il se pose directement sur le
          #0B1120 de la barre laterale, sans rectangle visible.
        */}
        <Link href="/" className="min-w-0">
          <Image
            src="/logo-orderly.png"
            alt="Orderly - Gestion des commandes"
            width={720}
            height={168}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-white/5 hover:text-slate-200 lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="mb-1 px-3 text-[10.5px] font-semibold tracking-wider text-slate-500">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = item.href === pathname;
                const className = `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
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
        <button
          onClick={signOut}
          disabled={signingOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-60"
        >
          {signingOut ? (
            <Loader2 className="h-[17px] w-[17px] animate-spin" />
          ) : (
            <LogOut className="h-[17px] w-[17px]" />
          )}
          <span>{signingOut ? "Deconnexion..." : "Deconnexion"}</span>
        </button>
      </div>
      </aside>
    </>
  );
}

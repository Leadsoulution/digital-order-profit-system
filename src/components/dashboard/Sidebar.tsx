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
} from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "PRINCIPAL",
    items: [
      { label: "Tableau de bord", icon: LayoutDashboard },
      { label: "Leads / Commandes", icon: ShoppingCart, active: true },
      { label: "Imports Excel", icon: FileSpreadsheet },
      { label: "Confirmation", icon: PhoneCall },
      { label: "Perf. Agents", icon: Activity },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { label: "Pages & Boutiques", icon: Store },
      { label: "Produits", icon: Package },
      { label: "Media", icon: ImageIcon },
      { label: "Publicite", icon: Megaphone },
      { label: "Integrations", icon: Puzzle },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Expedition", icon: Truck },
      { label: "Inventaire", icon: Boxes },
      { label: "Fournisseurs", icon: Users },
    ],
  },
  {
    title: "GESTION",
    items: [
      { label: "Finance", icon: Wallet },
      { label: "Utilisateurs", icon: UserCog },
      { label: "Rapports", icon: BarChart2 },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col bg-[#0B1120] text-slate-300">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <ShoppingCart className="h-4 w-4 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold text-white">Lead2Door</p>
          <p className="text-[11px] text-slate-500">From Lead to Door</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-1.5 px-3 text-[10.5px] font-semibold tracking-wider text-slate-500">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <div
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                        item.active
                          ? "bg-blue-600 text-white font-medium"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200 cursor-default"
                      }`}
                    >
                      <Icon className="h-[17px] w-[17px] shrink-0" />
                      <span>{item.label}</span>
                    </div>
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
  );
}

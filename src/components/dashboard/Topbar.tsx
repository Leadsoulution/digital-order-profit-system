import {
  Search,
  ShoppingCart,
  CheckCircle2,
  PackageCheck,
  Moon,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher leads, produits, commandes..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-14 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10.5px] font-medium text-gray-400">
          Ctrl K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        <div className="relative flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[13px] font-medium text-blue-700">
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
          <ShoppingCart className="h-3.5 w-3.5" />
          48745
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-green-100 bg-green-50 px-2.5 py-1.5 text-[13px] font-medium text-green-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          31327
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 text-[13px] font-medium text-orange-700">
          <PackageCheck className="h-3.5 w-3.5" />
          22869
        </div>

        <button className="ml-1.5 flex items-center gap-1 rounded-lg px-2 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50">
          FR
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>

        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-50">
          <Moon className="h-[18px] w-[18px]" />
        </button>

        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-50">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
            2
          </span>
        </button>

        <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-1.5 hover:bg-gray-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[12px] font-semibold text-white">
            MA
          </span>
          <span className="text-[13px] font-medium text-gray-700">
            Mohamed Alaoui
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}

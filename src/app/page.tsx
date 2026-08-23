import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import LeadsCommandesPage from "@/components/dashboard/LeadsCommandesPage";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <LeadsCommandesPage />
      </div>
    </div>
  );
}

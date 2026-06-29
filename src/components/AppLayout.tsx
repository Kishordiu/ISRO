import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSession } from "../session";

export default function AppLayout() {
  const { session } = useSession();
  if (!session) return <Navigate to="/" replace />;
  return (
    <div className="flex h-screen overflow-hidden bg-surface-main">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

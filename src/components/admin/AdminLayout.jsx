import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <AdminSidebar />
      <main className="flex-1 p-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}

// components/layout/Layout.tsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen bg-gray-300 p-4">
      <div className="flex h-full rounded-[24px] overflow-hidden shadow-lg bg-white">
        <Sidebar />
        <main className="flex-1 bg-neutral-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

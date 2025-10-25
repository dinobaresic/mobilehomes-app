"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {user && <Sidebar role={user.role} />}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-700">
                🏡 MobileHome Places
              </h1>
              {user && (
                <p className="text-sm text-gray-500">
                  Dobrodošao, <span className="font-semibold">{user.name}</span> 👋
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 py-4 border-t bg-white">
            © 2025 MobileHome Places — Explore & Relax in Croatia 🇭🇷
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}

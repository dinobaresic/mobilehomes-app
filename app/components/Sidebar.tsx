"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  // Različiti linkovi ovisno o ulozi
  const links =
    role === "OWNER"
      ? [
          { href: "/dashboard/owner", label: "📦 Moje parcele" },
          { href: "/dashboard/owner/add", label: "➕ Dodaj parcelu" },
          { href: "/dashboard/owner/messages", label: "💬 Poruke" },
        ]
      : [
          { href: "/dashboard/camper", label: "🌊 Dostupne lokacije" },
          { href: "/dashboard/camper/favorites", label: "❤️ Favoriti" },
          { href: "/dashboard/camper/messages", label: "💬 Poruke" },
        ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold text-green-700 mb-6">
        {role === "OWNER" ? "Owner Panel" : "Camper Panel"}
      </h2>
      <nav className="flex flex-col space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-md transition ${
              pathname === link.href
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    // 🔹 Ako je camper, a pokušava ući u /owner → redirectaj
    if (pathname.startsWith("/dashboard/owner") && user.role !== "OWNER") {
      router.push("/dashboard/camper");
      return;
    }

    // 🔹 Ako je owner, a pokušava ući u /camper → redirectaj
    if (pathname.startsWith("/dashboard/camper") && user.role !== "CAMPER") {
      router.push("/dashboard/owner");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Provjera pristupa...
      </div>
    );
  }

  return <>{children}</>;
}

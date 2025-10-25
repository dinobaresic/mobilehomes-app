"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/30">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
    <h1
      onClick={() => router.push("/")}
      className="text-2xl font-extrabold cursor-pointer drop-shadow-lg"
    >
      MobileHome Spotter
    </h1>

    <div className="flex gap-4">
      <button
        onClick={() => router.push("/register")}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow-md"
      >
        Let's Start
      </button>
      <button
        onClick={() => router.push("/login")}
        className="border border-white/80 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition shadow-sm"
      >
        Already Registered?
      </button>
    </div>
  </div>
</nav>
  );
}

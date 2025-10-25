"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ⬅️ dodano
import { loginUser } from "../lib/api";

export default function LoginPage() {
  const router = useRouter(); // ⬅️ kreiranje router instance
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(form);
      console.log("User:", user);
      setMessage(`✅ Uspješan login: ${user.name}`);

      localStorage.setItem("user", JSON.stringify(user));

      // kratak delay pa redirect
      setTimeout(() => {
        if (user.role === "CAMPER") {
          router.push("/dashboard/camper");
        } else if (user.role === "OWNER") {
          router.push("/dashboard/owner");
        } else {
          setMessage("❌ Nepoznata uloga korisnika!");
        }
      }, 800);
    } catch (err) {
      setMessage("❌ Pogrešan email ili lozinka!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Forma */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Prijava
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-semibold transition disabled:opacity-70"
        >
          {loading ? "Prijavljivanje..." : "Prijavi se"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}
      </form>
    </div>
  );
}

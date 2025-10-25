"use client";
import { useState } from "react";
import { registerUser } from "../lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: "CAMPER" | "OWNER";
  }>({
    name: "",
    email: "",
    password: "",
    role: "CAMPER",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await registerUser(form);
      console.log("Šaljem:", form);
      setMessage(`✅ Registracija uspješna: ${user.email}`);
    } catch (err: any) {
      setMessage("❌ Greška pri registraciji!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/register.jpg')",
      }}
    >
      {/* Tamni overlay za čitljivost */}
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Registracija
        </h2>

        <input
          type="text"
          placeholder="Ime"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-green-400"
          required
        />
        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as "CAMPER" | "OWNER" })
          }
          className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-green-400"
        >
          <option value="CAMPER">Camper</option>
          <option value="OWNER">Owner</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold transition"
        >
          Registriraj se
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}
      </form>
    </div>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";

export default function AddParcelForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    sizeSquareMeters: "",
    pricePerYear: "",
    hasElectricity: false,
    hasWater: false,
    hasWifi: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Kreiraj parcelu
      const ownerId = 2; // privremeno, dok ne vežemo usera iz logina
      const parcelRes = await axios.post(
        `http://localhost:8080/api/parcels/owner/${ownerId}`,
        {
          title: form.title,
          description: form.description,
          location: form.location,
          sizeSquareMeters: Number(form.sizeSquareMeters),
          pricePerYear: Number(form.pricePerYear),
          hasElectricity: form.hasElectricity,
          hasWater: form.hasWater,
          hasWifi: form.hasWifi,
        }
      );

      const newParcel = parcelRes.data;

      // 2️⃣ Ako ima sliku, pošalji upload
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(
          `http://localhost:8080/api/parcels/upload-image/${newParcel.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setMessage("✅ Parcela uspješno dodana!");
      setForm({
        title: "",
        description: "",
        location: "",
        sizeSquareMeters: "",
        pricePerYear: "",
        hasElectricity: false,
        hasWater: false,
        hasWifi: false,
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Greška pri dodavanju parcele.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        ➕ Dodaj novu parcelu
      </h2>

      <input
        type="text"
        placeholder="Naziv parcele"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Lokacija (npr. Drage, Pakoštane...)"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <textarea
        placeholder="Opis (pored mora, pogled, detalji...)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
        rows={3}
      />

      <div className="flex gap-3 mb-3">
        <input
          type="number"
          placeholder="Kvadratura (m²)"
          value={form.sizeSquareMeters}
          onChange={(e) => setForm({ ...form, sizeSquareMeters: e.target.value })}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="Godišnja cijena (€)"
          value={form.pricePerYear}
          onChange={(e) => setForm({ ...form, pricePerYear: e.target.value })}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <div className="flex gap-4 mb-4 text-sm">
        <label>
          <input
            type="checkbox"
            checked={form.hasElectricity}
            onChange={(e) => setForm({ ...form, hasElectricity: e.target.checked })}
          />{" "}
          Struja
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.hasWater}
            onChange={(e) => setForm({ ...form, hasWater: e.target.checked })}
          />{" "}
          Voda
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.hasWifi}
            onChange={(e) => setForm({ ...form, hasWifi: e.target.checked })}
          />{" "}
          Wi-Fi
        </label>
      </div>

      {/* Upload slike */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Odaberi sliku parcele:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
      >
        Spremi parcelu
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
}

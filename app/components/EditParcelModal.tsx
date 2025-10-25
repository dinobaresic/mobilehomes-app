"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface EditParcelModalProps {
  parcel: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export default function EditParcelModal({ parcel, onClose, onSave }: EditParcelModalProps) {
  const [form, setForm] = useState({
    title: parcel.title || "",
    location: parcel.location || "",
    description: parcel.description || "",
    sizeSquareMeters: parcel.sizeSquareMeters || "",
    pricePerYear: parcel.pricePerYear || "",
    hasElectricity: parcel.hasElectricity || false,
    hasWater: parcel.hasWater || false,
    hasWifi: parcel.hasWifi || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-[450px]"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">✏️ Uredi parcelu</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Naziv"
            value={form.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Lokacija"
            value={form.location}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            placeholder="Opis"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <div className="flex gap-2">
            <input
              type="number"
              name="sizeSquareMeters"
              placeholder="m²"
              value={form.sizeSquareMeters}
              onChange={handleChange}
              className="border p-2 w-1/2 rounded"
            />
            <input
              type="number"
              name="pricePerYear"
              placeholder="Cijena godišnje (€)"
              value={form.pricePerYear}
              onChange={handleChange}
              className="border p-2 w-1/2 rounded"
            />
          </div>

          <div className="flex gap-3 text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="hasElectricity"
                checked={form.hasElectricity}
                onChange={handleChange}
              />
              Struja
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="hasWater"
                checked={form.hasWater}
                onChange={handleChange}
              />
              Voda
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="hasWifi"
                checked={form.hasWifi}
                onChange={handleChange}
              />
              Wi-Fi
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            Odustani
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            💾 Spremi
          </button>
        </div>
      </motion.div>
    </div>
  );
}

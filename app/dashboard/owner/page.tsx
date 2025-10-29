"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "@/app/components/ConfirmModal";
import EditParcelModal from "@/app/components/EditParcelModal";

export default function OwnerDashboard() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const [editParcel, setEditParcel] = useState<any | null>(null);

  // 🔹 Uzimamo API URL iz .env (radi i lokalno i na Vercelu)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

  const ownerId = 2; // privremeno — zamijenit će se ID-jem ulogiranog usera

  // 🔹 Dohvati sve parcele vlasnika
  useEffect(() => {
    axios
      .get(`${API_URL}/parcels/owner/${ownerId}`)
      .then((res) => setParcels(res.data))
      .catch((err) => console.error("❌ Greška kod dohvata parcela:", err));
  }, [API_URL]);

  // 🔹 Označi ili ukloni parcelu iz selekcije
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 🔹 Brisanje jedne parcele
  const deleteParcel = (id: number) => {
    setConfirmMessage("Jeste li sigurni da želite obrisati ovu parcelu?");
    setConfirmAction(() => async () => {
      try {
        await axios.delete(`${API_URL}/parcels/${id}`);
        setParcels((prev) => prev.filter((p) => p.id !== id));
        setMessage("✅ Parcela obrisana.");
      } catch (err) {
        console.error("❌ Greška pri brisanju parcele:", err);
        setMessage("❌ Greška pri brisanju parcele.");
      } finally {
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  // 🔹 Brisanje više odjednom
  const deleteSelected = () => {
    if (selected.length === 0) return alert("Nema označenih parcela.");
    setConfirmMessage("Jeste li sigurni da želite obrisati označene parcele?");
    setConfirmAction(() => async () => {
      try {
        await Promise.all(
          selected.map((id) => axios.delete(`${API_URL}/parcels/${id}`))
        );
        setParcels((prev) => prev.filter((p) => !selected.includes(p.id)));
        setSelected([]);
        setMessage("✅ Označene parcele obrisane.");
      } catch (err) {
        console.error("❌ Greška pri brisanju označenih parcela:", err);
        setMessage("❌ Greška pri brisanju označenih parcela.");
      } finally {
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  // 🔹 Spremi promjene kod uređivanja
  const handleSaveEdit = async (updatedData: any) => {
    if (!editParcel) return;

    try {
      const res = await axios.put(
        `${API_URL}/parcels/${editParcel.id}`,
        updatedData
      );
      setParcels((prev) =>
        prev.map((p) => (p.id === editParcel.id ? res.data : p))
      );
      setMessage("✅ Parcela uspješno ažurirana!");
    } catch (err) {
      console.error("❌ Greška pri ažuriranju parcele:", err);
      setMessage("❌ Greška pri ažuriranju parcele!");
    } finally {
      setEditParcel(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">🌿 Moje parcele</h1>
        {selected.length > 0 && (
          <button
            onClick={deleteSelected}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Obriši označene ({selected.length})
          </button>
        )}
      </div>

      {message && (
        <p className="mb-4 text-center text-sm text-gray-700">{message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcels.map((parcel) => (
          <div
            key={parcel.id}
            className={`border rounded-xl shadow-md bg-white overflow-hidden relative ${
              selected.includes(parcel.id) ? "ring-4 ring-red-300" : ""
            }`}
          >
            <button
              onClick={() => toggleSelect(parcel.id)}
              className="absolute top-3 left-3 bg-white/80 text-xs px-2 py-1 rounded shadow hover:bg-red-100"
            >
              {selected.includes(parcel.id) ? "✅ Označeno" : "Označi"}
            </button>

            {parcel.imageUrl ? (
              <img
                src={parcel.imageUrl}
                alt={parcel.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Nema slike
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {parcel.title}
              </h2>
              <p className="text-sm text-gray-600">{parcel.location}</p>
              <p className="text-green-600 font-semibold mt-2">
                💶 {parcel.pricePerYear} € / godišnje
              </p>
              <p className="text-sm text-gray-500 mt-1">
                📏 {parcel.sizeSquareMeters} m² — ⚡ Struja{" "}
                {parcel.hasWater && "💧 Voda"} {parcel.hasWifi && "📶 Wi-Fi"}
              </p>
              <p className="text-sm text-gray-600 mt-2">{parcel.description}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditParcel(parcel)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏️ Uredi
                </button>
                <button
                  onClick={() => deleteParcel(parcel.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑️ Obriši
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal za potvrdu */}
      {showConfirm && (
        <ConfirmModal
          title="Potvrda brisanja"
          message={confirmMessage}
          confirmText="Da, obriši"
          cancelText="Odustani"
          onConfirm={confirmAction}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* 🔹 Modal za uređivanje */}
      {editParcel && (
        <EditParcelModal
          parcel={editParcel}
          onClose={() => setEditParcel(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

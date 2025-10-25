"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CamperDashboard() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/parcels")
      .then((res) => {
        setParcels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvaćanju parcela:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Učitavanje parcela...</p>;
  }

  if (parcels.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Trenutno nema dostupnih parcela.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🌴 Dostupne parcele u Hrvatskoj
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcels.map((parcel) => (
          <div
            key={parcel.id}
            className="border rounded-xl shadow-md bg-white overflow-hidden hover:shadow-lg transition"
          >
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
              <h2 className="text-lg font-bold text-gray-800 mb-1">{parcel.title}</h2>
              <p className="text-sm text-gray-600">{parcel.location}</p>
              <p className="text-green-600 font-semibold mt-2">
                💶 {parcel.pricePerYear} € / godišnje
              </p>
              <p className="text-sm text-gray-500 mt-1">
                📏 {parcel.sizeSquareMeters} m² — ⚡ Struja{" "}
                {parcel.hasWater && "💧 Voda"} {parcel.hasWifi && "📶 Wi-Fi"}
              </p>
              <p className="text-sm text-gray-600 mt-2">{parcel.description}</p>

              {parcel.owner && (
                <div className="mt-4 border-t pt-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-800">👤 Vlasnik:</p>
                  <p>{parcel.owner.name}</p>
                  <p className="text-blue-600 underline">{parcel.owner.email}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { uploadParcelImage } from "@/app/lib/api";

export default function UploadParcelImage({ parcelId }: { parcelId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Odaberi sliku prije slanja!");
      return;
    }
    try {
      await uploadParcelImage(parcelId, file);
      setMessage("✅ Slika uspješno uploadana!");
    } catch {
      setMessage("❌ Greška pri uploadu slike.");
    }
  };

  return (
    <div className="mt-2 flex flex-col items-start">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-1 rounded"
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Upload sliku
      </button>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/api/hello");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>❌ Error: {(error as any).message}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">🚐 Mobile Homes Booking</h1>
      <p className="mt-4 text-lg text-gray-600">{data}</p>
    </main>
  );
}

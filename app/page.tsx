"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

    
     {/* Hero section */}
<section
  className="relative flex-1 bg-cover bg-center flex items-center justify-center text-center px-6"
  style={{
    backgroundImage: "url('mobile_landingphoto.jpg')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 text-white max-w-2xl">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
      Find your mobile home place in beautiful Croatia
    </h1>
    <p className="text-lg mb-8 text-gray-200">
      Experience comfort, sea breeze, and stunning Dalmatian coast views — all in one place.
    </p>
    <button
      onClick={() => (window.location.href = "/register")}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg text-lg transition"
    >
      Start Exploring
    </button>
  </div>
</section>

      <Footer />
    </main>
  );
}

// src/app/user/seller/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerSetup() {
  const [address, setAddress] = useState<string>("");
  const router = useRouter();

  const handleSubmit = () => {
    if (address.trim() === "") return; // Ensure the address isn't empty

    // Save address info to the database (API request)
    // For now, navigate directly to the dashboard (you'll want to add the ID here)
    router.push("/user/seller/dashboard/[id]"); // Replace [id] with the user's unique ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Seller Setup</h2>
      <p>Please provide the address of the home you're selling:</p>
      <input
        type="text"
        placeholder="123 Main St, City, State"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-4 px-4 py-2 border rounded w-64"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        disabled={address.trim() === ""}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}

// src/app/user/agent/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgentSetup() {
  const [dreNumber, setDreNumber] = useState<string>("");
  const [brokerage, setBrokerage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = () => {
    if (dreNumber.trim() === "" || brokerage.trim() === "") return; // Ensure fields aren't empty

    // Save agent info to the database (API request)
    // For now, navigate directly to the dashboard (you'll want to add the ID here)
    router.push("/user/agent/dashboard/[id]"); // Replace [id] with the user's unique ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Agent Setup</h2>
      <p>Please provide your DRE number and brokerage information:</p>
      <input
        type="text"
        placeholder="DRE Number"
        value={dreNumber}
        onChange={(e) => setDreNumber(e.target.value)}
        className="mt-4 px-4 py-2 border rounded w-64"
      />
      <input
        type="text"
        placeholder="Brokerage Name"
        value={brokerage}
        onChange={(e) => setBrokerage(e.target.value)}
        className="mt-4 px-4 py-2 border rounded w-64"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        disabled={dreNumber.trim() === "" || brokerage.trim() === ""}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}

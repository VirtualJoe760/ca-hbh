// src/app/user/buyer/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyerSetup() {
  const [preApproved, setPreApproved] = useState<boolean | null>(null);
  const router = useRouter();

  const handleSubmit = () => {
    // Save pre-approval info to the database (API request)
    // For now, navigate directly to the dashboard (you'll want to add the ID here)
    router.push("/user/buyer/dashboard/[id]"); // Replace [id] with the user's unique ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Buyer Setup</h2>
      <p>Have you been pre-approved for a mortgage?</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setPreApproved(true)}
          className={`px-4 py-2 rounded ${preApproved ? "bg-blue-600" : "bg-gray-300"}`}
        >
          Yes
        </button>
        <button
          onClick={() => setPreApproved(false)}
          className={`px-4 py-2 rounded ${preApproved === false ? "bg-blue-600" : "bg-gray-300"}`}
        >
          No
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        disabled={preApproved === null}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}


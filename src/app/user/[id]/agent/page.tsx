// src/app/user/[id]/agent/page.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AgentSetup({ params }: { params: { id: string } }) {
  const [dreNumber, setDreNumber] = useState<string>("");
  const [brokerage, setBrokerage] = useState<string>("");
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check if the user is authenticated and matches the ID in the URL
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user || session.user.id !== params.id) {
    router.push("/auth/signin");
    return null;
  }

  const handleSubmit = async () => {
    if (dreNumber.trim() === "" || brokerage.trim() === "") return; // Ensure fields aren't empty

    // Save agent info to the database (API request)
    // For now, navigate directly to the dashboard
    router.push(`/user/${params.id}/agent/dashboard`);
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
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        disabled={dreNumber.trim() === "" || brokerage.trim() === ""}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}

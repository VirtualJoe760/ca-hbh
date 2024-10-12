// src/app/user/[id]/seller/page.tsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SellerSetup({ params }: { params: { id: string } }) {
  const [address, setAddress] = useState<string>("");
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
    if (address.trim() === "") return; // Ensure the address isn't empty

    // Save address info to the database (API request)
    // For now, navigate directly to the dashboard
    router.push(`/user/${params.id}/seller/dashboard`);
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
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        disabled={address.trim() === ""}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}

// src/app/user/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserRoleSelection() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  const handleRoleSelection = (role: "buyer" | "seller" | "agent") => {
    router.push(`/user/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
      <p className="mb-4">Please select your role:</p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleRoleSelection("buyer")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          I am a Buyer
        </button>
        <button
          onClick={() => handleRoleSelection("seller")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          I am a Seller
        </button>
        <button
          onClick={() => handleRoleSelection("agent")}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          I am an Agent
        </button>
      </div>
    </div>
  );
}

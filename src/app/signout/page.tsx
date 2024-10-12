// src/app/auth/signout/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">You&apos;ve been signed out</h2>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Go back to Home
      </button>
      <button
        onClick={() => router.push("/auth/signin")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Sign Back In
      </button>
    </div>
  );
}

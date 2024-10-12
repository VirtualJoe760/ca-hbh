// src/app/user/page.tsx
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Check if the user is authenticated
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    // Redirect based on user role
    const { role, id } = session.user;

    if (role === "buyer") {
      router.push(`/user/${id}/buyer`);
    } else if (role === "seller") {
      router.push(`/user/${id}/seller`);
    } else if (role === "agent") {
      router.push(`/user/${id}/agent`);
    } else {
      // Redirect unknown roles to a safe page or error page
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">Redirecting...</h2>
      <p className="text-gray-500">Please wait while we verify your role.</p>
    </div>
  );
}

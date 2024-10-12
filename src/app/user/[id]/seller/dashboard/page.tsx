// src/app/user/seller/dashboard/page.tsx
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { withRole } from "@/utils/withRole";

function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is unauthenticated, redirect to the sign-in page
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    // Prevent access if user is not a seller
    if (status === "authenticated" && session?.user?.role !== "seller") {
      router.push("/"); // Redirect unauthorized users to the home page
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Optional: Replace with a spinner component
  }

  // If session exists and role is 'seller', render the dashboard
  if (session?.user?.role === "seller") {
    return (
      <div>
        <h1>Welcome to the Seller Dashboard</h1>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/auth/signin" });
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return null; // This line ensures that unauthorized users won't see any content
}

export default withRole(SellerDashboard, "seller");

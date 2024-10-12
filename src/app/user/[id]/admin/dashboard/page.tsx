// src/app/user/[id]/admin/dashboard/page.tsx
// @ts-ignore - Temporarily ignoring the TypeScript error
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { withAdminAccess } from "@/utils/withAdminAccess"; // Assuming you're using a specific HOC for admin access

function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams(); // Extracts the user ID from the URL

  useEffect(() => {
    if (status === "loading") return;

    // Check if the user is authenticated and has the 'admin' role.
    // Also, ensure the session user ID matches the ID from the URL params.
    if (
      status === "authenticated" &&
      (session?.user?.role !== "admin" || session?.user?.id !== id)
    ) {
      router.push("/"); // Redirect non-admins or unauthorized users to the homepage or another safe page.
    }
  }, [status, session, id, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If session exists and role is 'admin', render the dashboard
  if (session?.user?.role === "admin" && session?.user?.id === id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">
          Welcome, {session?.user?.name}. You have administrative privileges.
        </p>
        <div className="mt-6">
          <p className="text-gray-600">
            Manage users, view reports, and control platform settings here.
          </p>
        </div>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/auth/signin" });
          }}
          className="bg-red-500 text-white px-4 py-2 rounded mt-6"
        >
          Sign Off
        </button>
      </div>
    );
  }

  return null;
}

export default withAdminAccess(AdminDashboard);

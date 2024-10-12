// src/utils/withAdminAccess.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function withAdminAccess(Component: React.ComponentType) {
  return function AdminProtected({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated" && session?.user?.role !== "admin") {
        // Redirect non-admin users back to the home page or another safe page
        router.push("/");
      }
    }, [status, session, router]);

    if (status === "loading") return <div>Loading...</div>;

    return <Component>{children}</Component>;
  };
}

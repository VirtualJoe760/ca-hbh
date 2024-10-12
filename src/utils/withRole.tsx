// src/utils/withRole.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function withRole(
  Component: React.ComponentType,
  requiredRole: "buyer" | "seller" | "agent" | "admin"
) {
  return function RoleProtected({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // Only run if the user is authenticated and their role is not the required role
      if (status === "authenticated" && session?.user?.role !== requiredRole) {
        router.push("/");  // Redirect to home if the role doesn't match
      }
    }, [status, session, router]); // Removed 'requiredRole' from the dependency array

    if (status === "loading") return <div>Loading...</div>;

    return <Component>{children}</Component>;
  };
}

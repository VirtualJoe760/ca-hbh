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
      if (status === "authenticated" && session?.user?.role !== requiredRole) {
        router.push("/");
      }
    }, [status, session, requiredRole, router]);

    if (status === "loading") return <div>Loading...</div>;

    return <Component>{children}</Component>;
  };
}

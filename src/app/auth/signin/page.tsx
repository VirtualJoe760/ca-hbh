// src/app/auth/signin/page.tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/catalyst/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role && session?.user?.id) {
      // Destructure the user role and ID for cleaner logic
      const { role, id } = session.user;

      // Redirect based on user role and ID
      const rolePath = {
        buyer: `/user/${id}/buyer/dashboard`,
        seller: `/user/${id}/seller/dashboard`,
        agent: `/user/${id}/agent/dashboard`,
        admin: `/user/${id}/admin/dashboard`,
      };

      const redirectTo = rolePath[role] || "/";
      router.push(redirectTo);
    }
  }, [status, session, router]);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Handle the redirect manually to include user role
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Sign in to access your account and get started.
        </p>

        <Button
          onClick={() => signIn("google")}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Continue with Google
        </Button>

        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required
          />
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

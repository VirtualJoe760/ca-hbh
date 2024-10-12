// src/app/auth/signup/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/catalyst/button";
import { signIn } from "next-auth/react"; // Ensure signIn is imported

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller" | "agent" | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!role) {
      setError("Please select if you are a buyer, seller, or realtor.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        setError(data.message || "Failed to create account");
      }
    } catch (error) {
      // Log the error for debugging and set a general error message
      console.error("Sign-up error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
          Create an Account
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Join us and start your journey.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <Button
          onClick={() => signIn("google")}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign up with Google
        </Button>

        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "buyer" | "seller" | "agent")}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required
          >
            <option value="" disabled>
              Are you planning on buying, selling, or joining as a realtor?
            </option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="agent">Realtor</option>
          </select>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}

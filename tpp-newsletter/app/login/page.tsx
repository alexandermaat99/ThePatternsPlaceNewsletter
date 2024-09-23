"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation"; // If you need to redirect after login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for displaying error messages
  const router = useRouter(); // Use router for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear any existing error messages

    // Supabase sign-in using email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error during login:", error.message);
      setErrorMessage(error.message); // Show error message to the user
    } else {
      console.log("Login successful:", data);
      router.push("/sandbox"); // Redirect user to dashboard or a protected route
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-10 relative bg-tppWhite mx-10">
        <h1 className="font-space text-center text-xl mb-4">Login</h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form className="text-center" onSubmit={handleLogin}>
          <input
            className="w-full p-2 mb-4 border rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-tppPink px-5 py-2 rounded-lg text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client
import { useState } from "react";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-tppPink text-white font-semibold py-2 px-4 rounded mt-4"
      disabled={loading}
    >
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}

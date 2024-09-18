"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import GOOGLE_LOGO from "@/public/images/GOOGLE_LOGO.svg";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        return;
      }

      const user = sessionData?.session?.user;
      console.log("Session data:", sessionData);

      if (user) {
        // Provide a fallback if email is undefined
        const email = user.email || "no-email-provided";

        // Insert the user into the custom users table
        const { data: insertData, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              id: user.id,
              email: email, // Use email or fallback value
              username: email.split("@")[0], // Use part of the email or fallback
              profile_picture_url: user.user_metadata.avatar_url || "",
              is_buyer: false,
              is_seller: false,
              pattern_points: 0,
            },
          ]);

        if (insertError) {
          console.error(
            "Error inserting user into custom users table:",
            insertError.message
          );
        } else {
          console.log(
            "User successfully inserted into custom users table:",
            insertData
          );
        }
      }
    };

    fetchUserSession();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
      setLoading(false);
    } else {
      console.log("Google OAuth sign-in initiated");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center w-full py-2 bg-tppWhite outline-none outline-tppBlack outline-1 rounded-[10px] text-tppBlack font-normal mb-4"
      disabled={loading}
    >
      <GOOGLE_LOGO className="mr-2 " />{" "}
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}

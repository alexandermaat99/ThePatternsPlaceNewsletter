"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import BACK_ARROW from "@/public/images/BACK_ARROW.svg";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Sign up the user in Supabase authentication
    const { data: signupData, error: signupError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signupError) {
      console.error("Error during signup:", signupError.message);
      setLoading(false);
      return;
    }

    console.log("Signup success, data:", signupData);

    const user = signupData?.user;

    if (user) {
      // Provide a fallback if email is undefined
      const email = user.email || "no-email-provided";

      // Insert user into custom users table
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: user.id, // Auth user ID
            email: email, // Use email or fallback value
            username: email.split("@")[0], // Use part of the email or fallback
            profile_picture_url: "", // Default value
            is_buyer: false,
            is_seller: false,
            pattern_points: 0, // Default value
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

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-10 relative bg-tppWhite mx-10">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <BACK_ARROW className="h-6 w-6 text-gray-700" />
          <span className="ml-2 text-gray-700">Back</span>
        </div>
        <div className="font-space text-center">
          <h1>Sign Up Testing</h1>
        </div>

        <form className="text-center" onSubmit={handleSignup}>
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
          <button className="bg-tppPink px-5" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <GoogleSignInButton />
      </div>
    </div>
  );
}

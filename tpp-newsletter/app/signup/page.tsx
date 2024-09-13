"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: Sign up the user in Supabase authentication
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

    const user = signupData?.user;
    console.log("Signed up user:", user);

    // Step 2: Insert user details into the custom users table
    if (user) {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: user.id, // This is the ID from Supabase's auth system
            email: user.email,
            username: user.email?.split("@")[0], // Example: use the email prefix as username
            profile_picture_url: "", // Default or leave it null
            pattern_points: 0, // Default value
            is_buyer: false,
            is_seller: false,
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

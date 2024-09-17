"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import BACK_ARROW from "@/public/images/BACK_ARROW.svg"; // Import the back arrow icon
import GoogleSignInButton from "@/components/GoogleSignInButton"; // Import the GoogleSignInButton component

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize router here

  const handleNavigateToTermsOfService = () => {
    router.push("/terms-of-service"); // Navigate to the terms-of-service page
  };

  const handleNavigateToPrivacyPolicy = () => {
    router.push("/privacy-policy"); // Navigate to the privacy-policy page
  };

  const handleBack = () => {
    router.push("/"); // Navigate to the home page (root URL)
  };

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-10 relative bg-tppWhite mx-10">
        {" "}
        <div>
          {/* Back Button */}
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={handleBack}
          >
            <BACK_ARROW className="h-6 w-6 text-gray-700" />
            <span className="ml-2 text-gray-700">Back</span>
          </div>
          <div className="font-space text-center">
            <h1>Sign Up Test</h1>
          </div>

          <form className="text-center" onSubmit={handleSignup}>
            <input
              className="w-full p-2 mb-4 border rounded-lg text-tppBlack placeholder:text-tppNotSelectedGray focus:outline-tppPink duration-400"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full p-2 mb-4 border rounded-lg text-tppBlack placeholder:text-tppNotSelectedGray focus:outline-tppPink duration-400"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="bg-tppPink px-5"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <GoogleSignInButton />
          <p className="mt-4 text-center text-tppBlack">
            By proceeding, you agree to the <br />
            <span
              onClick={handleNavigateToTermsOfService} // Navigate to terms of service page on click
              className="text-tppPink font-medium cursor-pointer ml-2 "
            >
              Terms of Service
            </span>
            and
            <span
              onClick={handleNavigateToPrivacyPolicy} // Navigate to privacy policy page on click
              className="text-tppPink font-medium cursor-pointer ml-2 "
            >
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

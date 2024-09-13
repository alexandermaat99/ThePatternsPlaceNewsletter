"use client"; // This tells Next.js that this component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation"; // In Next.js 13+, use next/navigation
import { supabase } from "../lib/supabaseClient"; // Adjust the path as per your project
import TPP_SVG from "@/public/images/TPP_SVG.svg";
import GOOGLE_LOGO from "@/public/images/GOOGLE_LOGO.svg";

export default function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the useRouter hook from next/navigation

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      setShowModal(false); // Close modal on success
    }
  };

  // Function to navigate to signup page
  const handleNavigateToSignup = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  const isFormFilled = email && password;

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg bg-tppPink"
      >
        Log In
      </button>

      {/* Modal */}
      {showModal ? (
        <div className="fixed inset-0 bg-tppBlack bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-10 relative bg-tppWhite mx-10">
            <button
              className="absolute top-4 right-4"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-normal text-center font-space text-tppBlack">
              Welcome to
            </h2>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-space text-center mb-4 text-tppBlack">
              The Pattern&apos;s Place
            </h1>

            {/* tpp logo */}
            <div className="flex justify-center mb-4">
              <TPP_SVG />
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded-lg placeholder:text-tppNotSelectedGray text-tppBlack focus:outline-tppPink duration-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded-lg text-tppBlack placeholder:text-tppNotSelectedGray focus:outline-tppPink duration-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className={`w-full py-2 rounded-lg duration-500 ${
                  isFormFilled
                    ? "bg-tppPink text-tppWhite font-space font-bold hover:bg-pink-600"
                    : "bg-tppUnSelectedPink text-tppPink font-bold font-space "
                }`}
                onClick={handleLogin}
                disabled={!isFormFilled} // Disable button if fields are empty
              >
                Sign in
              </button>
            </form>

            {/* Toggle to Sign Up page */}
            <p className="mt-4 text-center text-tppBlack">
              Don&apos;t have an account?
              <span
                onClick={handleNavigateToSignup} // Navigate to signup page on click
                className="text-tppPink font-bold cursor-pointer ml-2 "
              >
                Sign Up
              </span>
            </p>
            <p className=" font-medium text-xl my-4 text-center">or</p>
            <button className="flex items-center justify-center w-full py-2 bg-tppWhite outline-none outline-tppBlack outline-1 rounded-[10px] text-tppBlack font-normal mb-4">
              <GOOGLE_LOGO className="mr-2 " />{" "}
              {/* Add some margin to the right of the logo */}
              Continue with Google
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

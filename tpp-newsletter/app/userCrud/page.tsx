"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase

const Dashboard = () => {
  // Set the type to either null or User (from Supabase)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user); // Set the user from the session
      } else {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession(); // Call the async function to fetch session
  }, []);

  if (!user) {
    return <p>Not logged in</p>;
  }

  return <p>Welcome, {user.email}</p>;
};

export default Dashboard;

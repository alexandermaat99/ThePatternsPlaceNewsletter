"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

// Define the structure of a user object
type User = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  profile_picture_url?: string;
  is_buyer: boolean;
  is_seller: boolean;
  pattern_points: number;
  created_at: string;
};

const UserCrud = () => {
  const [users, setUsers] = useState<User[]>([]); // Use the User type
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Fetch all users
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data as User[]); // Cast the data to User type
    }
  };

  // Create new user
  const createUser = async () => {
    const { error } = await supabase
      .from("users")
      .insert([{ username, email, password_hash: "defaultHash" }]);
    if (error) {
      console.error("Error creating user:", error);
    } else {
      setUsername("");
      setEmail("");
      fetchUsers(); // Refresh the users list
    }
  };

  // Update user
  const updateUser = async (id: string, newUsername: string) => {
    const { error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", id);
    if (error) {
      console.error("Error updating user:", error);
    } else {
      fetchUsers(); // Refresh the users list
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error);
    } else {
      fetchUsers(); // Refresh the users list
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component loads
  }, []);

  return (
    <div>
      <h1>User CRUD</h1>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.username} ({user.email})
            </span>
            <button
              onClick={() =>
                updateUser(
                  user.id,
                  prompt("New username", user.username) || user.username
                )
              }
            >
              Update
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCrud;

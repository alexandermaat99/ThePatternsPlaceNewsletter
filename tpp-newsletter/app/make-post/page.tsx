"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust path based on your setup

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [difficulty, setDifficulty] = useState("1"); // Difficulty level as number
  const [imageFile, setImageFile] = useState<File | null>(null); // Image state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Allow error to be string or null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    // Get the user using supabase.auth.getUser() method
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(); // Fetch user data

    if (userError) {
      setError("Error retrieving user data");
      setLoading(false);
      return;
    }

    if (!user) {
      setError("You need to be logged in to create a post.");
      setLoading(false);
      return;
    }

    // Step 1: Insert post into the `posts` table
    const { data: postData, error: postError } = await supabase
      .from("posts") // Use the correct table name 'posts'
      .insert([
        {
          user_id: user.id, // Use the user ID from the fetched user object
          title,
          description,
          price: parseFloat(price),
          initial_difficulty_rating: parseInt(difficulty),
        },
      ])
      .select("id"); // Get the newly inserted post's ID

    if (postError) {
      setError(postError.message);
      setLoading(false);
      return;
    }

    const post_id = postData?.[0]?.id; // Get the inserted post's ID

    // Step 2: Handle image upload if an image file is selected
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${post_id}.${fileExt}`; // Create a unique filename based on the post_id
      const filePath = `post_images/${fileName}`;

      // Upload the image to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("post_images") // Your bucket name
        .upload(filePath, imageFile);

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      // Step 3: Get the public URL of the uploaded image
      const { data: imageUrlData } = supabase.storage
        .from("post_images")
        .getPublicUrl(filePath);
      const imageUrl = imageUrlData?.publicUrl;

      // Step 4: Insert the image data into the `post_images` table
      const { error: imageError } = await supabase.from("post_images").insert([
        {
          post_id: post_id, // Link the image to the post via the post_id
          image_url: imageUrl, // Store the image URL
        },
      ]);

      if (imageError) {
        setError(`Failed to save image URL: ${imageError.message}`);
        setLoading(false);
        return;
      }
    }

    // Post and image uploaded successfully
    alert("Post created successfully!");
    setLoading(false);
    // Optionally, redirect the user to the new post page
  };

  // Handle image file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4">Create a New Post</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Post Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Post Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Post Price */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Post Difficulty */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>

        {/* Post Image Upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Upload Image (optional)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Adjust path based on your setup
import Image from "next/image";
import Select from "react-select";
import { MultiValue } from "react-select";

type CategoryOption = {
  value: string; // Assuming UUID is a string
  label: string;
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [difficulty, setDifficulty] = useState("1"); // Difficulty level as number
  const [isBoosted, setIsBoosted] = useState(false); // Boosted post state
  const [copyright, setCopyright] = useState(""); // copyright state
  const [copyrightDescription, setCopyrightDescription] = useState<
    JSX.Element | string
  >("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null); // Image state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Allow error to be string or null
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handlePriceChange = (input: string) => {
    // Remove non-numeric characters except for the period
    let sanitizedInput = input.replace(/[^0-9.]/g, "");

    // Split the input at the decimal
    const parts = sanitizedInput.split(".");

    // Ensure only one decimal and restrict to two decimal places
    if (parts.length > 2) {
      sanitizedInput = parts[0] + "." + parts[1]; // Only keep the first decimal
    }

    if (parts[1] && parts[1].length > 2) {
      sanitizedInput = `${parts[0]}.${parts[1].slice(0, 2)}`; // Restrict to two decimal places
    }

    setPrice(sanitizedInput);
  };

  const handleCopyrightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCopyright(selectedValue);

    switch (selectedValue) {
      case "0":
        setCopyrightDescription("");
        break;
      case "1":
        setCopyrightDescription(
          <>
            This work is licensed under a{" "}
            <strong>Standard Digital File License</strong>.
            <br />
            Digital files have a strict non-commercial, personal use only
            license.
            <br />
            <br />
            You shall not share, sub-license, sell, rent, host, transfer, or
            distribute in any way the digital file or physical versions of this
            pattern, not any other derivative work of this object in its digital
            or physical format.
            <br />
            <br />
            You can not host these files on other digital platforms, web stores
            or cloud repositories. The patterns may not be used in any way
            whatsoever in which you charge money, collect fees.
          </>
        );
        break;
      case "2":
        setCopyrightDescription(
          <>
            This work is licensed under a {""}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              className="text-tppPink underline"
            >
              Create Commons (4.0 International License) Attribution —
              Noncommercial - Share Alike
            </a>
            <br />
            <br />
            Allows remixing, transforming, and building upon the material, but
            altered material must give appropriate credit, indicate if changes
            were made, and cannot be used for commercial purposes.
          </>
        );
        break;
      case "3":
        setCopyrightDescription(
          <>
            This work is licensed under a {""}
            <a
              href="https://creativecommons.org/public-domain/cc0/"
              target="_blank"
              className="text-tppPink underline"
            >
              Create Commons (International License) Public Domain
            </a>
            <br />
            <br />
            Waives all copyright protections.
          </>
        );
        break;
    }
  };

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
          is_boosted: isBoosted,
          copyright,
        },
      ])
      .select("id"); // Get the newly inserted post's ID

    if (postError) {
      setError(postError.message);
      setLoading(false);
      return;
    }

    const post_id = postData?.[0]?.id; // Get the inserted post's ID

    const categoryInserts = selectedCategories.map((categoryID) => ({
      id: post_id,
      categoryID,
    }));

    const { error: categoryError } = await supabase
      .from("post_categories")
      .insert(categoryInserts);

    if (categoryError) {
      setError(`Failed to associate categories: ${categoryError.message}`);
      setLoading(false);
      return;
    }

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
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categoriesData, error } = await supabase
        .from("categories") // Correct table name
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(
          categoriesData.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (newValue: MultiValue<CategoryOption>) => {
    setSelectedCategories(newValue.map((option) => option.value));
  };

  // Handle image file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate the preview URL
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-4">Post a Pattern</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {imagePreview && (
          <div className="mb-4">
            <Image
              src={imagePreview}
              alt="Image Preview"
              width={200} // Set appropriate width
              height={10} // Set appropriate height
              className="rounded-md"
              layout="intrinsic" // Optional: use responsive layout
            />
          </div>
        )}

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
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
              $
            </span>
            <input
              id="price"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 pl-8 text-gray-700"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Post Difficulty */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Difficulty Level (1-10)
          </label>
          <select
            id="difficulty"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="1">1 - Beginner</option>
            <option value="2">2</option>
            <option value="3">3 - Intermediate</option>
            <option value="4">4</option>
            <option value="5">5 - Advanced</option>
          </select>
        </div>

        {/* Categories Multi-Select */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categories"
          >
            Categories
          </label>
          <Select
            options={categories}
            isMulti
            onChange={handleCategoryChange}
            value={categories.filter((cat) =>
              selectedCategories.includes(cat.value)
            )}
          />
        </div>

        {/* asking if they want to boost the post */}
        <label className="relative inline-flex items-center cursor-pointer mb-4">
          Boost pattern after post? (additional cost) &nbsp;
          <input
            type="checkbox"
            checked={isBoosted}
            onChange={() => setIsBoosted(!isBoosted)}
            className="sr-only peer"
          />
          <div
            className={`w-11 h-6 bg-tppBackground rounded-full peer 
    ${isBoosted ? "peer-checked:bg-tppUnSelectedPink" : ""}
    relative transition duration-300 flex items-center`}
          >
            <span
              className={`w-5 h-5 bg-tppPink rounded-full transition-all transform 
      ${isBoosted ? "translate-x-5" : "translate-x-0"} 
      shadow-md`}
            />
          </div>
        </label>

        {/* copyright protection level */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="difficulty"
          >
            Copyright Protection
          </label>
          <select
            id="copyright"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={copyright}
            onChange={handleCopyrightChange} // Use the new handler function here
            required
          >
            <option value="0">No Protection</option>
            <option value="1">Standard Digital File License</option>
            <option value="2">
              Creative Commons - Attribution — Noncommercial - Share Alike
            </option>
            <option value="3">Creative Commons - Public Domain</option>
          </select>
        </div>

        {/* description of the protection level selected  */}
        {copyrightDescription && (
          <p className="text-gray-600 mt-2 mb-4">{copyrightDescription} </p>
        )}

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

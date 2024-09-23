"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Assuming your Supabase client is set up here

// ImageUpload Component
export default function ImageUpload({ postId }: { postId: string }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  // Upload image to Supabase storage and insert record into the database
  const uploadImage = async () => {
    if (!imageFile) return;
    setLoading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the image to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("post_images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      setLoading(false);
      return;
    }

    // Get the public URL of the uploaded image
    const { data } = supabase.storage
      .from("post_images")
      .getPublicUrl(filePath);

    const imageUrl = data?.publicUrl;

    if (imageUrl) {
      // Insert the image record into the `post_images` table
      const { error: insertError } = await supabase.from("post_images").insert([
        {
          postID: postId, // Use postId passed as prop
          image_url: imageUrl,
        },
      ]);

      if (insertError) {
        console.error(
          "Error inserting image record into post_images:",
          insertError
        );
      } else {
        console.log("Image successfully uploaded and record saved:", imageUrl);
      }
    } else {
      console.error("Failed to retrieve the public URL.");
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}

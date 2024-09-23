"use client";

import { useState, useEffect } from "react";
import LoginModal from "@/components/LoginModal";
import PostPreview from "@/components/PostPreview";
import UploadPhoto from "@/components/UploadPhoto";

export default function Sandbox() {
  const [postId, setPostId] = useState<string | null>(null);

  // Simulating fetching the postId from an API or database
  useEffect(() => {
    const fetchPostId = async () => {
      // Simulate API call to fetch postId
      const fetchedPostId = "dynamic-post-id";
      setPostId(fetchedPostId);
    };
    fetchPostId();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {postId ? <UploadPhoto postId={postId} /> : <p>Loading...</p>}
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <LoginModal />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        <PostPreview />
        <PostPreview />
        {/* Add more PostPreview components as needed */}
      </div>
    </div>
  );
}

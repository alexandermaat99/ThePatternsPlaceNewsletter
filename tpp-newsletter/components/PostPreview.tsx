"use client";

import Image from "next/image";
const coverPhoto = "/images/postImages/image1.webp";

function Post() {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="w-64 h-64 relative">
          <Image
            src={coverPhoto}
            alt="Placeholder image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-800 p-4">Post Title</h1>
        <p className="text-gray-600">
          Posted by: <span className="font-semibold">username</span>
        </p>
        <p className="text-gray-600">
          Price: <span className="font-semibold">$0.00</span>
        </p>
        <p className="text-gray-600">
          Difficulty: <span className="font-semibold">Easy</span>
        </p>
        <p className="text-gray-600">
          Comments: <span className="font-semibold">0</span>
        </p>
        <p className="text-gray-600">
          Likes: <span className="font-semibold">0</span>
        </p>
      </div>
    </div>
  );
}

export default Post;

"use client";

import Image from "next/image";
import { useState } from "react";

// Example images array (update with your actual images)
const postImages = [
  "/images/postImages/image1.webp",
  "/images/postImages/image2.webp",
  "/images/postImages/image3.webp",
  "/images/postImages/image4.webp",
  "/images/postImages/image5.webp",
  "/images/postImages/image6.webp",
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === postImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? postImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevImage}>Previous</button>
      <Image
        src={postImages[currentIndex]}
        alt={`Post image ${currentIndex + 1}`}
        width={500}
        height={300}
      />
      <button onClick={nextImage}>Next</button>
    </div>
  );
}

function Post() {
  return (
    <div>
      <h1>Post Title</h1>
      <ImageCarousel />
      <p>Posted by: username</p>
      <p>Price: $0.00</p>
      <p>Difficulty: Easy</p>
      <p>Categories: Category</p>
      <p>Posted Date: 2022-01-01</p>
      <p>Comments: 0</p>
      <p>Likes: 0</p>
    </div>
  );
}

export default Post;

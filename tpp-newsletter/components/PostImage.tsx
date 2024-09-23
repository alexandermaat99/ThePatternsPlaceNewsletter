import Image from "next/image";

interface PostImageProps {
  imageUrl: string;
}

export default function PostImage({ imageUrl }: PostImageProps) {
  return (
    <Image
      src={imageUrl}
      alt="Post Image"
      width={500} // Set appropriate width
      height={300} // Set appropriate height
      layout="responsive" // Optional: Makes the image responsive
      quality={75} // Optional: Adjust image quality for optimization
    />
  );
}

import LoginModal from "@/components/LoginModal"; // Adjust path based on your project structure
import PostPreview from "@/components/PostPreview";

export default function sandbox() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <LoginModal />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
    </div>
  );
}

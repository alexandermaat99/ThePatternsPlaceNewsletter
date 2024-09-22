import LoginModal from "@/components/LoginModal"; // Adjust path based on your project structure
import PostPreview from "@/components/PostPreview";

export default function Sandbox() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <LoginModal />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
        <PostPreview />
      </div>
    </div>
  );
}

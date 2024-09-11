import LearnMoreButton from "@/components/LearnMoreButton";
// import TPP_SVG from "@/public/images/TPP_SVG.svg"; // Assuming you're using an SVG loader for Next.js

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Render the SVG component */}
      <LearnMoreButton href="/" label="< Back to the signup page :)" />
    </div>
  );
}

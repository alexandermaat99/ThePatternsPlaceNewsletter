import LearnMoreButton from "@/components/LearnMoreButton";
import NewsletterForm from "@/components/NewsletterForm";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-screen bg-tppBackground space-y-8">
      {/* Render the LearnMoreButton */}
      <LearnMoreButton href="/" label="< Back to the signup page :)" />

      {/* Styled paragraph block */}
      <h1 className="text-2xl font-space font-bold text-tppBlack">
        About The Pattern&apos;s Place
      </h1>

      <p className="font-space text-tppBlack text-lg leading-relaxed max-w-4xl">
        Welcome to <strong>The Pattern&apos;s Place</strong>, a marketplace
        under construction by <strong>Gail, a sewist and patternmaker</strong>,
        and <strong>Alex, a software developer</strong>. While platforms like
        Etsy are great, we wanted to create a platform that is specifically
        tailored to the {""}
        <strong>unique needs of sewists and patternmakers</strong>. Our
        marketplace serves those who sew as a hobby, as a lifestyle, and those
        who make a living selling sewing patterns.
      </p>

      <p className="font-space text-tppBlack text-lg leading-relaxed max-w-4xl mt-4">
        <strong>At The Pattern&apos;s Place</strong>, you can{" "}
        <strong>buy and sell sewing patterns</strong> with features like{" "}
        <strong>video tutorials</strong>, <strong>community reviews</strong>,
        and <strong>difficulty level ratings</strong>. Our goal is to build a
        supportive community where you can find and/or sell high-quality
        patterns and allow you to find your next favorite creator.
      </p>

      <p className="font-space text-tppBlack text-lg leading-relaxed max-w-4xl mt-4">
        We are currently under construction, but we&apos;d love to keep in touch
        with you. Sign up for our newsletter below to get updates, see our
        progress, and be the first to know when{" "}
        <strong>The Pattern&apos;s Place</strong> launches!
      </p>

      {/* Render the NewsletterForm */}
      <NewsletterForm />
    </div>
  );
}

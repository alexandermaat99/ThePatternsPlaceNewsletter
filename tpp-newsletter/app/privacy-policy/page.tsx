"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import BACK_ARROW from "@/public/images/BACK_ARROW.svg"; // Import the back arrow icon

export default function PrivacyPolicy() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/signup"); // Redirect to signup page
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-md space-y-8 mb-40">
      <div
        className="flex items-center mb-6 cursor-pointer"
        onClick={handleBack}
      >
        <BACK_ARROW className="h-6 w-screen- text-gray-700" />
        <span className="ml-2 text-gray-700">Back to Sign Up</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-sm md:text-base">Last updated: 9/13/2024</p>

      <h1 className="font-bold text-xl md:text-2xl">Introduction</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        Welcome to The Pattern&apos;s Place! We respect your privacy and are
        committed to protecting the personal information you share with us. This
        Privacy Policy outlines the types of personal information we collect,
        how we use it, and the steps we take to ensure it is protected.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">
        1. Information We Collect
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We collect the following types of information:
      </p>
      <ul className="list-disc ml-6 font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        <li>
          <strong>Personal Information:</strong> When you create an account,
          sign up for our services, or use our platform, we may collect personal
          information such as your name, email address, and contact details.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect information about how you
          access and use our website or services, such as IP addresses, browser
          type, pages visited, and other analytics.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies and
          other tracking technologies to improve user experience, analyze
          website performance, and serve personalized content.
        </li>
      </ul>

      <h1 className="font-bold text-xl md:text-2xl">
        2. How We Use Your Information
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We use the information we collect to:
      </p>
      <ul className="list-disc ml-6 font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        <li>Provide and maintain our services.</li>
        <li>Improve and personalize your experience on our platform.</li>
        <li>Send updates, newsletters, and marketing communications.</li>
        <li>
          Analyze website traffic and user behavior to improve our services.
        </li>
        <li>Ensure the security of our platform.</li>
      </ul>

      <h1 className="font-bold text-xl md:text-2xl">
        3. Sharing of Information
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We do not sell or rent your personal information. However, we may share
        your information with:
      </p>
      <ul className="list-disc ml-6 font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        <li>
          <strong>Service Providers:</strong> Third-party service providers that
          help us operate our website and services.
        </li>
        <li>
          <strong>Legal Requirements:</strong> If required by law, we may
          disclose your information to comply with legal obligations or protect
          the rights and safety of our company, users, or others.
        </li>
      </ul>

      <h1 className="font-bold text-xl md:text-2xl">4. Security</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We take reasonable steps to protect your personal information from
        unauthorized access, alteration, or disclosure. However, no method of
        transmission over the internet is completely secure, and we cannot
        guarantee the absolute security of your information.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">5. Your Rights</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        You have the right to:
      </p>
      <ul className="list-disc ml-6 font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        <li>Access and review the personal information we hold about you.</li>
        <li>
          Request corrections to any inaccurate or incomplete information.
        </li>
        <li>Request the deletion of your personal information.</li>
      </ul>

      <h1 className="font-bold text-xl md:text-2xl">6. Third-Party Links</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        Our website may contain links to third-party sites. We are not
        responsible for the privacy practices or content of those sites, so we
        encourage you to review their privacy policies.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">
        7. Changes to This Privacy Policy
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on our website and
        updating the effective date at the top of this page.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">8. Contact Us</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at support@thepatternsplace.com.
      </p>
    </div>
  );
}

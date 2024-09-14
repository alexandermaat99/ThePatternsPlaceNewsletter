"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import BACK_ARROW from "@/public/images/BACK_ARROW.svg"; // Import the back arrow icon

export default function TermsOfService() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/signup"); // Redirect to signup page
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-md space-y-8 mb-40">
      {/* Back Arrow */}
      <div
        className="flex items-center mb-6 cursor-pointer"
        onClick={handleBack}
      >
        <BACK_ARROW className="h-6 w-screen- text-gray-700" />
        <span className="ml-2 text-gray-700">Back to Sign Up</span>
      </div>

      {/* Content of the page */}
      <h1 className="text-2xl md:text-3xl font-semibold">Terms and Service</h1>
      <p className="text-sm md:text-base">Effective Date: 9/13/2024</p>

      <h1 className="font-bold text-xl md:text-2xl">Introduction</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        Welcome to The Pattern&apos;s Place! By accessing or using our services,
        you agree to be bound by these Terms of Service (&quot;Terms&quot;).
        Please read them carefully before using our platform.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">1. Acceptance of Terms</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        By accessing our website or services, you agree to comply with these
        Terms and all applicable laws and regulations. If you do not agree with
        these Terms, you are prohibited from using our services.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">2. Accounts</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        To access certain features of our services, you may need to create an
        account. When creating an account, you agree to provide accurate and
        complete information and keep it updated. You are responsible for
        safeguarding your account credentials and for all activities that occur
        under your account. You must notify us immediately of any unauthorized
        use of your account.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">3. Use of Services</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        You agree to use our services only for lawful purposes and in accordance
        with these Terms. You agree not to: Engage in any activity that violates
        local, state, or international laws. Access, tamper with, or use
        non-public areas of our platform. Transmit any harmful, offensive, or
        illegal content.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">
        4. Intellectual Property
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        All content, trademarks, and other intellectual property on our platform
        are the property of The Pattern&apos;s Place or its licensors. You may
        not use, copy, or distribute any content from our platform without prior
        written consent from us.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">5. Termination</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We reserve the right to suspend or terminate your access to our platform
        at any time if you violate these Terms. Upon termination, your right to
        use our services will immediately cease.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">
        6. Limitation of Liability
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        To the fullest extent permitted by law, The Pattern&apos;s Place shall
        not be liable for any direct, indirect, incidental, special, or
        consequential damages arising out of or related to your use of our
        services.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">
        7. Disclaimer of Warranties
      </h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        Our services are provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind. We do not guarantee that our services
        will be error-free, uninterrupted, or free from viruses or other harmful
        components.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">8. Changes to Terms</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        We may update these Terms from time to time. We will notify you of any
        changes by posting the updated Terms on our website and updating the
        effective date at the top of this page. Your continued use of our
        services after any changes signifies your acceptance of the new Terms.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">9. Governing Law</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        These Terms shall be governed by and construed in accordance with the
        laws of Utah, USA, without regard to its conflict of law provisions.
      </p>

      <h1 className="font-bold text-xl md:text-2xl">10. Contact Us</h1>
      <p className="font-space text-tppBlack text-base md:text-lg leading-relaxed max-w-4xl">
        If you have any questions about these Terms, please contact us at
        support@thepatternsplace.com.
      </p>
    </div>
  );
}

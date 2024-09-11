"use client";

import { getPlaneKeyframes } from "@/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "@/lib/getTrailsKeyframes";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { FormEvent, useRef, useState } from "react";

function NewsletterForm() {
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);

      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
      });

      to(button, { keyframes: getTrailsKeyframes(button) });
    }

    const res = await fetch("/api/addSubscription", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await res.json();

    if (data.error) {
      setErrorMessage("Hey, you are already subscribed!");
      setSuccessMessage(undefined);
      return;
    }

    setSuccessMessage(data.res);
    setErrorMessage("");
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col md:w-[400px]">
      <form onSubmit={handleSubmit} className="newsletter-form ">
        <div className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px] bg-tppWhite hover:shadow-outline-pink  focus-within:!shadow-outline-pink-focus transition-all duration-300">
          <EnvelopeIcon className="hidden sm:inline w-6 h-6 text-tppNotSelectedGray group-focus-within:text-tppPink group-hover:text-tppPink transition-colors duration-300" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-white text-sm sm:text-base outline-none placeholder-tppNotSelectedGray group-focus-within:placeholder-white bg-transparent placeholder:transition-colors placeholder:duration-300"
          />
          <button
            ref={buttonRef}
            className={`${
              active && "active"
            } disabled:!bg-tppNotSelectedGray  disabled:opacity-50  text-sm md:text-base`}
            disabled={!input}
            type="submit"
          >
            <span className="default">Subscribe</span>
            <span className="success">
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Done
            </span>
            <svg className="trails" viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className="plane">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </button>
        </div>
      </form>

      <div className="relative">
        {(successMessage || errorMessage) && (
          <div className="flex items-start space-x-2 bg-tppWhite text-tppPink mt-3 rounded-[9px] py-4 px-6 animate-fade-bottom absolute">
            <div className="h-6 w-6 bg-tppUnSelectedPink flex items-center justify-center rounded-full border border-tppPink flex-shrink-0">
              <CheckIcon className="h-4 w-4 text-tppPink" />
            </div>
            <div className="text-xs sm:text-sm text-tppBlack">
              {successMessage ? (
                <p>
                  We&apos;ve added{" "}
                  <span className="text-tppPink">
                    {successMessage.email_address}
                  </span>{" "}
                  to our waitlist. We&apos;ll let you know when we launch!
                </p>
              ) : (
                <p>
                  You are already added to our waitlist. We&apos;ll let you know
                  when we launch!
                </p>
              )}
            </div>
            <XMarkIcon
              className="h-5 w-5 cursor-pointer flex-shrink-0 text-tppBlack"
              onClick={dismissMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsletterForm;

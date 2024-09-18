import HeroText from "@/components/HeroText";
import NewsletterForm from "@/components/NewsletterForm";
import Socials from "@/components/Socials";
import LearnMoreButton from "@/components/LearnMoreButton"; // Import your button component

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-10 min-h-screen bg-tppBackground">
      {<HeroText />}
      {<NewsletterForm />}

      {/* Add the LearnMoreButton for the signup page */}
      {/* <LearnMoreButton href={"/signup"} label={"Sign Up"} /> */}

      <LearnMoreButton
        href={"/about"}
        label={"Learn more about The Pattern's Place"}
      />
      {<Socials />}
    </main>
  );
}

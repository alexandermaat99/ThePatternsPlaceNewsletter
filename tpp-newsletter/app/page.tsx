import HeroText from "@/components/HeroText";
import NewsletterForm from "@/components/NewsletterForm";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-10 min-h-screen">
      {<HeroText />}
      {<NewsletterForm />}
      {<Socials />}
    </main>
  );
}

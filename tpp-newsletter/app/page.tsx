import HeroText from "@/components/HeroText";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-10 min-h-screen">
      {<HeroText />}
      {<NewsletterForm />}
    </main>
  );
}

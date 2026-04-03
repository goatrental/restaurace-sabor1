import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Games from "@/components/games";
import Pricing from "@/components/pricing";
import Leaderboard from "@/components/leaderboard";
import Tournaments from "@/components/tournaments";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import IntroAnimation from "@/components/intro-animation";

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Games />
        <Pricing />
        <Leaderboard />
        <Tournaments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

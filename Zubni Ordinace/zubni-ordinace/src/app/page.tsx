import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Careers from "@/components/careers";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import SplashScreen from "@/components/splash-screen";

export default function Home() {
  return (
    <SplashScreen>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </SplashScreen>
  );
}

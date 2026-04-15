import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Locations from "@/components/Locations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Schedule = dynamic(() => import("@/components/Schedule"));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Schedule />
        <Pricing />
        <Locations />
        <Contact />
      </main>
      <Footer />
      {/* Floating chat bubble */}
      <a
        href="#kontakt"
        aria-label="Skontaktuj się z nami"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-[var(--color-on-primary)] hover:scale-110 active:scale-95 transition-all z-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
        style={{
          background: "linear-gradient(to top right, var(--color-primary), var(--color-primary-fixed))",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 -960 960 960"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
        </svg>
      </a>
    </>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background:
            "linear-gradient(to bottom right, var(--color-primary), var(--color-primary-container))",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-8">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase"
            style={{
              backgroundColor: "var(--color-secondary-container)",
              color: "var(--color-on-secondary-container)",
            }}
          >
            Pływanie dla każdego
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-on-surface)] leading-[1.1] -tracking-widest">
            Radość i{" "}
            <span className="text-[var(--color-primary)]">Bezpieczeństwo</span>{" "}
            w Wodzie
          </h1>

          <p className="text-xl text-[var(--color-on-surface-variant)] font-medium leading-relaxed max-w-lg">
            Nauka pływania dla dzieci i dorosłych w Lubinie prowadzona przez
            pasjonatów, którzy dbają o każdy Twój ruch.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
              style={{ boxShadow: "0 20px 40px -10px var(--color-primary)" }}
            >
              Zapisz się na pierwszą lekcję
            </a>
            <a
              href="#grafik"
              className="bg-white text-[var(--color-primary)] border-2 px-10 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-surface-container-low)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
              style={{ borderColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
            >
              Poznaj nasz grafik
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="hero-img-group relative">
          <div
            className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: "var(--color-secondary-container)" }}
            aria-hidden="true"
          />
          {/* Bubbles — absolute inside hero-img-group */}
          <span aria-hidden="true" className="hero-bubble absolute w-3 h-3" style={{ bottom:"4rem",  left:"1rem",   "--delay":"-0.3s",  "--dur":"2.0s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-5 h-5" style={{ bottom:"2rem",  left:"3rem",   "--delay":"-1.1s",  "--dur":"1.7s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-2 h-2" style={{ bottom:"5rem",  left:"6rem",   "--delay":"-0.7s",  "--dur":"2.2s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-4 h-4" style={{ bottom:"1rem",  left:"33%",    "--delay":"-1.5s",  "--dur":"1.9s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-3 h-3" style={{ bottom:"3rem",  left:"50%",    "--delay":"-0.5s",  "--dur":"2.1s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-6 h-6" style={{ bottom:"1.5rem",right:"4rem",  "--delay":"-1.3s",  "--dur":"1.6s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-2 h-2" style={{ bottom:"6rem",  right:"2rem",  "--delay":"-0.9s",  "--dur":"2.3s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-4 h-4" style={{ bottom:"2.5rem",right:"6rem",  "--delay":"-0.2s",  "--dur":"1.8s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-3 h-3" style={{ bottom:"0.5rem",right:"33%",   "--delay":"-1.6s",  "--dur":"2.0s" } as React.CSSProperties} />
          <span aria-hidden="true" className="hero-bubble absolute w-5 h-5" style={{ bottom:"4rem",  left:"66%",    "--delay":"-0.8s",  "--dur":"1.7s" } as React.CSSProperties} />
          <div className="rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/ryan-fleischer-B4OTiru9Rw8-unsplash.jpg"
              alt="Osoba pływająca na basenie krytym"
              width={600}
              height={500}
              className="w-full h-[500px] object-cover"
              priority
            />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl flex items-center gap-4 max-w-xs">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm">Certyfikowana kadra</p>
              <p className="text-xs text-[var(--color-on-surface-variant)]">
                Ponad 10 lat doświadczenia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

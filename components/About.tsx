import Image from "next/image";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2,12 C4,8 6,16 8,12 C10,8 12,16 14,12 C16,8 18,16 20,12 C21,10 22,11 22,12" />
        <path d="M2,17 C4,13 6,21 8,17 C10,13 12,21 14,17 C16,13 18,21 20,17" opacity="0.4" />
      </svg>
    ),
    title: "Nauka przez zabawę",
    desc: "Uczymy przez zabawę, budując pewność siebie i miłość do wody od pierwszego zanurzenia.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C10 6 6 9 6 13a6 6 0 0 0 12 0c0-4-4-7-6-11z" opacity="0.9"/>
        <path d="M12 15a2 2 0 0 0 2-2c0-1.5-2-4-2-4s-2 2.5-2 4a2 2 0 0 0 2 2z" fill="white" opacity="0.5"/>
      </svg>
    ),
    title: "Indywidualny progres",
    desc: "Małe grupy (max 6 osób) gwarantują że instruktor śledzi postęp każdego kursanta.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
        <path d="M480-80q-83 0-141.5-58.5T280-280q0-48 18-89.5T351-444l129-127 129 127q35 35 53 76.5t18 89.5q0 83-58.5 141.5T480-80ZM160-600l-56-56 63-63-63-63 56-57 63 64 63-64 57 57-64 63 64 63-57 56-63-63-63 63Zm320-120-56-56 63-63-63-63 56-57 63 64 63-64 57 57-64 63 64 63-57 56-63-63-63 63Z"/>
      </svg>
    ),
    title: "Bezpieczeństwo w wodzie",
    desc: "Certyfikowani ratownicy WOPR czuwają na każdych zajęciach — Twoje dziecko jest bezpieczne.",
  },
];

const stats = [
  { value: "10+", label: "lat w wodzie" },
  { value: "500+", label: "kursantów" },
  { value: "max 6", label: "osób w grupie" },
  { value: "2", label: "baseny" },
];

export default function About() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
      id="o-nas"
    >
      {/* Subtle decorative wave bg */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,100 C180,160 360,40 540,100 C720,160 900,40 1080,100 C1260,160 1380,60 1440,100 L1440,200 L0,200 Z"
          fill="var(--color-primary)"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900 inline-block">
            Poznaj nasz zespół i misję
          </h2>
          {/* Wave underline */}
          <div className="flex justify-center mt-3" aria-hidden="true">
            <svg viewBox="0 0 240 14" fill="none" className="w-48">
              <path
                d="M0,7 C40,1 80,13 120,7 C160,1 200,13 240,7"
                stroke="var(--color-primary-fixed)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Main grid */}
        <div className="flex flex-col md:flex-row gap-16 items-center">

          {/* Images — overlapping creative layout */}
          <div className="w-full md:w-1/2 relative h-[420px] flex-shrink-0">
            {/* Large image */}
            <div className="absolute left-0 top-0 w-[68%] h-[360px] rounded-2xl overflow-hidden shadow-xl ring-2 ring-[var(--color-primary-fixed)]">
              <Image
                src="/images/adrit1-kid-1401158.jpg"
                alt="Trener pływania pomagający dziecku utrzymać się na wodzie"
                fill
                className="object-cover"
                loading="lazy"
              />
              {/* blue water tint overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: "linear-gradient(to top, var(--color-primary), transparent)" }}
                aria-hidden="true"
              />
            </div>

            {/* Small image — bottom right, overlapping */}
            <div className="absolute right-0 bottom-0 w-[54%] h-[260px] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[var(--color-secondary-fixed)]">
              <Image
                src="/images/serena-repice-lentini-LTLBUvs4UdQ-unsplash.jpg"
                alt="Grupowe zajęcia pływania na basenie"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: "linear-gradient(to top, var(--color-secondary), transparent)" }}
                aria-hidden="true"
              />
            </div>

            {/* Floating years badge */}
            <div
              className="absolute -left-4 bottom-16 bg-white rounded-2xl shadow-xl px-5 py-4 z-10 flex items-center gap-3"
              aria-hidden="true"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2,12 C4,8 6,16 8,12 C10,8 12,16 14,12 C16,8 18,16 20,12" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-black text-blue-900 leading-none">10+</p>
                <p className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>lat w wodzie</p>
              </div>
            </div>

            {/* Decorative water drops */}
            <div className="absolute -top-3 right-12 w-5 h-5 rounded-full opacity-40 pointer-events-none" style={{ backgroundColor: "var(--color-primary-fixed)" }} aria-hidden="true" />
            <div className="absolute top-8 right-4 w-3 h-3 rounded-full opacity-30 pointer-events-none" style={{ backgroundColor: "var(--color-secondary-fixed)" }} aria-hidden="true" />
            <div className="absolute -bottom-2 left-1/3 w-4 h-4 rounded-full opacity-35 pointer-events-none" style={{ backgroundColor: "var(--color-primary-fixed)" }} aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <p
              className="text-lg leading-relaxed font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              ORKI LUBIN to nie tylko szkoła pływania — to miejsce, gdzie pasja
              spotyka się z profesjonalizmem. Nasi instruktorzy to doświadczeni
              ratownicy i byli zawodnicy, którzy kochają pracę z dziećmi i dorosłymi.
            </p>

            <div className="space-y-5">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="flex gap-4 items-start p-4 rounded-xl transition-colors hover:bg-white/60"
                >
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                      color: "var(--color-primary)",
                    }}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-blue-900">{f.title}</h3>
                    <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {f.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

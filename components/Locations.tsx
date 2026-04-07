const POOLS = [
  {
    id: "ustronie",
    name: "Basen Ustronie",
    address: "ul. Konopnickiej 5, 59-300 Lubin",
    district: "Dzielnica Ustronie",
    hours: "Pon–Pt: 6:00–22:00 · Sob–Nd: 8:00–20:00",
    color: "var(--color-primary)",
    // OpenStreetMap embed — adjust bbox/marker if needed
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=16.162%2C51.391%2C16.182%2C51.410&layer=mapnik&marker=51.40068%2C16.17147",
    mapsLink:
      "https://www.openstreetmap.org/?mlat=51.40068&mlon=16.17147#map=16/51.40068/16.17147",
  },
  {
    id: "centrum",
    name: "Basen Centrum",
    address: "ul. Sybiraków 11, 59-300 Lubin",
    district: "Centrum",
    hours: "Pon–Pt: 6:00–22:00 · Sob–Nd: 8:00–20:00",
    color: "var(--color-secondary)",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=16.196%2C51.383%2C16.216%2C51.401&layer=mapnik&marker=51.39200%2C16.20563",
    mapsLink:
      "https://www.openstreetmap.org/?mlat=51.39200&mlon=16.20563#map=16/51.39200/16.20563",
  },
];

export default function Locations() {
  return (
    <section
      id="lokalizacje"
      className="py-24"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* O mnie + Szkoła — dwie kolumny */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">

          {/* O mnie */}
          <div className="space-y-5">
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                color: "var(--color-primary)",
              }}
            >
              O mnie
            </span>
            <h2 className="text-3xl font-extrabold text-blue-900 leading-tight">
              Paweł — instruktor pływania
            </h2>
            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Nazywam się Paweł i jestem instruktorem pływania, ratownikiem WOPR oraz
              wychowawcą kolonijnym. Prowadzę zajęcia dla dzieci, młodzieży i dorosłych
              od podstaw nauki pływania po doskonalenie techniki i pracy nad efektywnością
              w wodzie.
            </p>
            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Z wodą jestem związany od najmłodszych lat, swoje doświadczenie budowałem
              w klubie MKS Piranie Lubin. Od lat aktywnie rozwijam się również sportowo,
              co przekładam na jakość i świadomość prowadzonych treningów.
            </p>
            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Na zajęciach pracuję nad techniką, ekonomią ruchu i swobodą w wodzie.
              Każdy trening jest dopasowany do poziomu i celu kursanta niezależnie od
              wieku. Dzięki temu nauka jest uporządkowana, skuteczna i nastawiona na
              realny progres.
            </p>
            <p
              className="text-base leading-relaxed font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Stawiam na indywidualne podejście, poprawną technikę od podstaw oraz
              budowanie pewności siebie w wodzie. Moim celem jest, aby każdy kursant
              nie tylko umiał pływać, ale robił to świadomie i z kontrolą.
            </p>
            <ul className="space-y-2">
              {[
                "Instruktor pływania",
                "Ratownik wodny WOPR",
                "Wychowawca kolonijny",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Szkoła pływania */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-between"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <div className="space-y-4">
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-secondary) 12%, transparent)",
                  color: "var(--color-secondary)",
                }}
              >
                Szkoła pływania
              </span>
              <h2 className="text-3xl font-extrabold text-blue-900 leading-tight">
                Szkoła pływania ORKI Lubin
              </h2>
              <p
                className="text-base leading-relaxed font-medium"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                ORKI Lubin to nowoczesna szkoła pływania prowadzona indywidualnie
                przez instruktora. To miejsce, w którym nauka pływania opiera się
                na spokojnej atmosferze, bezpieczeństwie i realnych postępach
                każdego kursanta.
              </p>
              <p
                className="text-base leading-relaxed font-medium"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Zajęcia odbywają się na dwóch basenach krytych w dzielnicy Ustronie
                oraz w Centrum. Uczę dzieci od 4. roku życia, młodzież oraz dorosłych,
                bez ograniczeń wiekowych i na każdym poziomie zaawansowania.
              </p>
              <p
                className="text-base leading-relaxed font-medium"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Moim celem jest nie tylko nauka techniki pływania, ale przede wszystkim
                budowanie pewności siebie w wodzie oraz swobody ruchu tak, aby każdy
                czuł się komfortowo i bezpiecznie.
              </p>
              <div className="space-y-1 text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                <p>
                  <span className="font-bold" style={{ color: "var(--color-on-surface)" }}>Mail:</span>{" "}
                  <a href="mailto:orkilubin@gmail.com" className="hover:underline" style={{ color: "var(--color-primary)" }}>
                    orkilubin@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-bold" style={{ color: "var(--color-on-surface)" }}>Telefon:</span>{" "}
                  <a href="tel:+48882199213" className="hover:underline" style={{ color: "var(--color-primary)" }}>
                    882 199 213
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapy */}
        <div className="text-center mb-10">
          <h3 className="text-3xl font-extrabold text-blue-900 mb-3">Gdzie trenujemy?</h3>
          <p className="font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
            Zajęcia odbywają się na dwóch basenach krytych w Lubinie
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {POOLS.map((pool) => (
            <div
              key={pool.id}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              {/* Map header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ backgroundColor: pool.color }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-75" style={{ color: "var(--color-on-primary)" }}>
                    {pool.district}
                  </p>
                  <h4 className="text-lg font-extrabold" style={{ color: "var(--color-on-primary)" }}>
                    {pool.name}
                  </h4>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  style={{ color: "var(--color-on-primary)", opacity: 0.7 }}
                  aria-hidden="true"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              </div>

              {/* Map iframe */}
              <div className="relative" style={{ height: 260 }}>
                <iframe
                  src={pool.mapSrc}
                  width="100%"
                  height="260"
                  style={{
                    border: "none",
                    display: "block",
                    filter: "saturate(0.8) contrast(1.08) brightness(0.97)",
                    pointerEvents: "none",
                  }}
                  loading="lazy"
                  title={`Mapa lokalizacji — ${pool.name}`}
                  aria-label={`Mapa z lokalizacją ${pool.name}, ${pool.address}`}
                />

                {/* Pulsing pin ripple — centered on map */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <div className="relative w-6 h-6">
                    <div className="ripple-ring absolute inset-0 rounded-full border-2 border-[var(--color-primary)] opacity-70" style={{"--rp-dur":"2.2s","--rp-delay":"0s"} as React.CSSProperties} />
                    <div className="ripple-ring absolute inset-0 rounded-full border-2 border-[var(--color-primary)] opacity-70" style={{"--rp-dur":"2.2s","--rp-delay":"0.7s"} as React.CSSProperties} />
                    <div className="ripple-ring absolute inset-0 rounded-full border-2 border-[var(--color-primary)] opacity-70" style={{"--rp-dur":"2.2s","--rp-delay":"1.4s"} as React.CSSProperties} />
                  </div>
                </div>

                {/* Animated wave overlay — bottom of map */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 40 }} aria-hidden="true">
                  <div className="map-wave-anim absolute bottom-0 left-0 w-[200%]">
                    <svg viewBox="0 0 2880 40" preserveAspectRatio="none" style={{ display:"block", width:"100%", height: 40 }}>
                      <path
                        d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 C1680,40 1920,0 2160,20 C2400,40 2640,0 2880,20 L2880,40 L0,40 Z"
                        fill="#5eb1fc"
                        fillOpacity="0.35"
                      />
                      <path
                        d="M0,28 C180,12 360,38 540,24 C720,10 900,36 1080,24 C1260,12 1440,38 1620,24 C1800,10 1980,36 2160,24 C2340,12 2520,38 2880,28 L2880,40 L0,40 Z"
                        fill="var(--color-surface-container-lowest)"
                        fillOpacity="0.92"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Map footer */}
              <div className="px-6 py-4 space-y-2">
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                    {pool.address}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} aria-hidden="true">
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm28 168-20-88-78-24 78-24 20-88 20 88 78 24-78 24-20 88Z" />
                  </svg>
                  <span className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                    {pool.hours}
                  </span>
                </div>
                <a
                  href={pool.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold mt-2 transition-opacity hover:opacity-75"
                  style={{ color: "var(--color-primary)" }}
                >
                  Sprawdź na mapie
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const CheckIcon = ({ white = false }: { white?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 -960 960 960"
    fill="currentColor"
    className={white ? "text-white" : "text-green-500"}
    aria-hidden="true"
  >
    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
  </svg>
);

export default function Pricing() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
      id="cennik"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Przejrzysty Cennik
          </h2>
          <p
            className="max-w-xl mx-auto font-medium"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Zainwestuj w zdrowie i umiejętności swoje lub Twojego dziecka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start pt-5">
          {/* Single lesson */}
          <article
            className="relative z-0 hover:z-10 p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-blue-400"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <h3 className="text-2xl font-bold mb-2">Lekcja Pojedyncza</h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Dla tych, którzy chcą spróbować.
            </p>
            <div className="text-4xl font-black text-blue-900 mb-8">
              60 PLN{" "}
              <span
                className="text-sm font-normal"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                / 45 min
              </span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-2">
                <CheckIcon />
                Wstęp na basen w cenie
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Dowolny poziom zaawansowania
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Konsultacja z trenerem
              </li>
            </ul>
            <a
              href="#kontakt"
              className="block w-full py-4 rounded-full border-2 text-center font-bold transition-all border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
            >
              Wybierz opcję
            </a>
          </article>

          {/* Group package — featured */}
          <article
            className="p-10 rounded-xl shadow-2xl relative z-[5] mt-[-8px]"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-1.5 rounded-full font-bold text-xs shadow-md"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              NAJCZĘSTSZY WYBÓR
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--color-on-primary)" }}
            >
              Pakiet Grupowy
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "color-mix(in srgb, var(--color-on-primary) 70%, transparent)" }}
            >
              Miesięczny karnet (4 wejścia).
            </p>
            <div
              className="text-4xl font-black mb-8"
              style={{ color: "var(--color-on-primary)" }}
            >
              200 PLN{" "}
              <span
                className="text-sm font-normal"
                style={{
                  color: "color-mix(in srgb, var(--color-on-primary) 70%, transparent)",
                }}
              >
                / m-c
              </span>
            </div>
            <ul
              className="space-y-4 mb-10"
              style={{ color: "var(--color-on-primary)" }}
            >
              <li className="flex items-center gap-2">
                <CheckIcon white />
                Stały termin zajęć
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon white />
                Małe grupy (max 6 osób)
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon white />
                Sprzęt do nauki w cenie
              </li>
            </ul>
            <a
              href="#kontakt"
              className="block w-full py-4 rounded-full text-center font-bold shadow-lg transition-all hover:bg-[var(--color-secondary-container)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-on-primary)]"
              style={{
                backgroundColor: "var(--color-on-primary)",
                color: "var(--color-primary)",
              }}
            >
              Zapisz się teraz
            </a>
          </article>

          {/* Individual */}
          <article
            className="relative z-0 hover:z-10 p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-slate-200"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <h3 className="text-2xl font-bold mb-2">Indywidualnie</h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Trening 1 na 1 z instruktorem.
            </p>
            <div className="text-4xl font-black text-blue-900 mb-8">
              120 PLN{" "}
              <span
                className="text-sm font-normal"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                / 45 min
              </span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-2">
                <CheckIcon />
                100% uwagi instruktora
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Szybsze efekty nauki
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Terminy do ustalenia
              </li>
            </ul>
            <a
              href="#kontakt"
              className="block w-full py-4 rounded-full border-2 text-center font-bold transition-all border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
            >
              Wybierz opcję
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

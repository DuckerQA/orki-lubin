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
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Cennik zajęć
          </h2>
          <div
            className="max-w-2xl mx-auto flex items-start gap-3 rounded-xl px-5 py-4 text-sm font-medium text-left"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-secondary) 10%, transparent)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="mt-0.5 flex-shrink-0"
              style={{ color: "var(--color-secondary)" }}
              aria-hidden="true"
            >
              <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
            <span>
              <strong style={{ color: "var(--color-on-surface)" }}>Ważne:</strong> Cennik zajęć nie obejmuje opłaty za
              wejście na basen. Koszt biletu należy uiścić we własnym zakresie,
              zgodnie z obowiązującym cennikiem obiektu.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-3xl mx-auto">
          {/* Individual */}
          <article
            className="p-10 rounded-xl shadow-2xl relative"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-1.5 rounded-full font-bold text-xs shadow-md"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              SZYBKIE EFEKTY
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--color-on-primary)" }}
            >
              Zajęcia indywidualne
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "color-mix(in srgb, var(--color-on-primary) 70%, transparent)" }}
            >
              Pełne skupienie na Tobie, szybkie efekty i trening w 100%
              dopasowany do Twojego poziomu oraz celów.
            </p>
            <div
              className="text-5xl font-black mb-1"
              style={{ color: "var(--color-on-primary)" }}
            >
              100 zł
            </div>
            <p
              className="text-sm mb-8"
              style={{ color: "color-mix(in srgb, var(--color-on-primary) 70%, transparent)" }}
            >
              1 osoba
            </p>
            <ul
              className="space-y-4 mb-10"
              style={{ color: "var(--color-on-primary)" }}
            >
              <li className="flex items-center gap-2">
                <CheckIcon white />
                100% uwagi instruktora
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon white />
                Elastyczne terminy
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon white />
                Trening na Twoim poziomie
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

          {/* Small groups */}
          <article
            className="p-10 rounded-xl shadow-sm border-t-4 border-blue-400 space-y-6"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Zajęcia w małej grupie</h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Kameralne grupy to idealne połączenie indywidualnego podejścia
                i motywującej atmosfery. Każde zajęcia są dostosowane do poziomu
                uczestników.
              </p>
            </div>

            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ backgroundColor: "var(--color-surface-container)" }}
              >
                <span className="font-bold text-blue-900">2 osoby</span>
                <span className="text-2xl font-black text-blue-900">120 zł</span>
              </div>
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ backgroundColor: "var(--color-surface-container)" }}
              >
                <span className="font-bold text-blue-900">3 osoby</span>
                <span className="text-2xl font-black text-blue-900">150 zł</span>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CheckIcon />
                Maks. 3 osoby w grupie
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Realne postępy we własnym tempie
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon />
                Stały termin zajęć
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

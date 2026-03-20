export default function Contact() {
  return (
    <section
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)" }}
      id="kontakt"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Skontaktuj się z nami
          </h2>
          <p
            className="max-w-xl mx-auto font-medium"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Napisz lub zadzwoń — chętnie odpowiemy na wszystkie pytania dotyczące
            zajęć i zapisów.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Address */}
          <article
            className="flex items-start gap-6 p-8 rounded-xl shadow-sm"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{
                backgroundColor: "var(--color-surface-container-high)",
                color: "var(--color-primary)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Gdzie pływamy?</h3>
              <p
                className="leading-relaxed"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Basen Ustronie — ul. Konopnickiej 5, 59-300 Lubin
                <br />
                Basen Centrum — ul. Sybiraków 11, 59-300 Lubin
              </p>
            </div>
          </article>

          {/* Phone */}
          <article
            className="flex items-start gap-6 p-8 rounded-xl shadow-sm"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{
                backgroundColor: "var(--color-surface-container-high)",
                color: "var(--color-primary)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Zadzwoń do nas</h3>
              <a
                href="tel:+48123456789"
                className="text-xl font-bold hover:text-[var(--color-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm outline-none"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                +48 123 456 789
              </a>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Pon – Pt: 9:00 – 18:00
              </p>
            </div>
          </article>

          {/* Email */}
          <article
            className="flex items-start gap-6 p-8 rounded-xl shadow-sm"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{
                backgroundColor: "var(--color-surface-container-high)",
                color: "var(--color-primary)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Wyślij wiadomość</h3>
              <a
                href="mailto:biuro@orkilubin.pl"
                className="hover:text-[var(--color-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm outline-none"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                biuro@orkilubin.pl
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

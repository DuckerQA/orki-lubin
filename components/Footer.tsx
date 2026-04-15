import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-t border-slate-200 pt-8 gap-8">
        {/* Brand */}
        <div className="mb-0">
          <div className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Image
              src="/images/orki-logo.svg"
              alt="ORKI LUBIN logo"
              width={24}
              height={24}
              className="h-6 w-auto grayscale brightness-50"
            />
            ORKI LUBIN
          </div>
          <p className="text-slate-500 mt-2 text-sm italic">
            Pasja do wody, radość z pływania.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Stopka">
          <div className="flex flex-wrap gap-8 justify-center">
            <span className="text-slate-600 text-sm">
              Polityka prywatności
            </span>
            <span className="text-slate-600 text-sm">
              Regulamin
            </span>
            <a
              href="#kontakt"
              className="text-slate-500 hover:text-sky-600 text-sm hover:underline transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm outline-none"
            >
              Kontakt
            </a>
          </div>
        </nav>

        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          © {year} ORKI LUBIN. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

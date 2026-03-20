"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#o-nas", label: "O nas" },
  { href: "#grafik", label: "Grafik" },
  { href: "#cennik", label: "Cennik" },
  { href: "#lokalizacje", label: "Lokalizacje" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("o-nas");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ["o-nas", "grafik", "cennik", "lokalizacje", "kontakt"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <nav
        className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4"
        aria-label="Nawigacja główna"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/images/orki-logo.svg"
            alt="ORKI LUBIN Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="text-2xl font-black tracking-tight text-blue-900">
            ORKI LUBIN
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-medium transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm outline-none ${
                  isActive
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="#kontakt"
          className="hidden md:inline-block bg-[var(--color-primary)] text-[var(--color-on-primary)] px-8 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
        >
          Zapisz się
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-slate-100 px-8 py-4 space-y-4"
        >
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block font-medium py-2 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm outline-none ${
                  isActive ? "text-blue-600 font-bold" : "text-slate-600"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="block bg-[var(--color-primary)] text-[var(--color-on-primary)] text-center px-8 py-3 rounded-full font-bold"
          >
            Zapisz się
          </a>
        </div>
      )}
    </header>
  );
}

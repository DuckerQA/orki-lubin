import type { Metadata } from "next";
import { Lexend, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-lexend",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orkilubin.pl"),
  title: "ORKI LUBIN | Szkoła Pływania",
  description:
    "Nauka pływania dla dzieci i dorosłych w Lubinie. Certyfikowani instruktorzy, małe grupy. Basen Ustronie ul. Konopnickiej 5 i Basen Centrum ul. Sybiraków 11.",
  keywords: [
    "szkoła pływania Lubin",
    "nauka pływania",
    "pływanie dzieci Lubin",
    "basen Lubin",
    "ORKI LUBIN",
    "instruktor pływania",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ORKI LUBIN | Szkoła Pływania",
    description:
      "Nauka pływania dla dzieci i dorosłych w Lubinie. Certyfikowani instruktorzy, małe grupy, Basen Miejski.",
    locale: "pl_PL",
    type: "website",
    siteName: "ORKI LUBIN",
    url: "https://orkilubin.pl",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORKI LUBIN | Szkoła Pływania",
    description:
      "Nauka pływania dla dzieci i dorosłych w Lubinie. Certyfikowani instruktorzy, małe grupy, Basen Miejski.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ORKI LUBIN Szkoła Pływania",
  description:
    "Nauka pływania dla dzieci i dorosłych w Lubinie. Certyfikowani instruktorzy, małe grupy.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Sybiraków 11",
    addressLocality: "Lubin",
    postalCode: "59-300",
    addressCountry: "PL",
  },
  telephone: "+48123456789",
  email: "biuro@orkilubin.pl",
  priceRange: "60-200 PLN",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${lexend.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-primary)] focus:text-[var(--color-on-primary)] focus:px-4 focus:py-2 focus:rounded-full focus:font-bold"
        >
          Przejdź do treści
        </a>
        {children}
      </body>
    </html>
  );
}

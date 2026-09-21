import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { restaurante } from "@/config/restaurante";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurante.domain),
  title: restaurante.seo.title,
  description: restaurante.seo.description,
  keywords: restaurante.seo.keywords,
  openGraph: {
    title: restaurante.seo.title,
    description: restaurante.seo.description,
    url: restaurante.domain,
    siteName: restaurante.name,
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: restaurante.name,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD for local SEO (Restaurant)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurante.name,
    "image": `${restaurante.domain}/images/hero-burger.webp`,
    "telephone": restaurante.whatsappNumber,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurante.location.address
    },
    "priceRange": "$$",
    "servesCuisine": "Burgers",
    "openingHoursSpecification": Object.entries(restaurante.schedule)
      .filter(([, hours]) => !hours.closedAllDay)
      .map(([day, hours]) => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ][parseInt(day)],
        "opens": hours.open,
        "closes": hours.close
      }))
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

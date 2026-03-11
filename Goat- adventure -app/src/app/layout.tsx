import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goat Adventures | Pattaya",
  description:
    "Book unforgettable adventures in Pattaya - yacht tours, snorkeling, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-900 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { prisma, ensureSeeded } from "@/lib/prisma";
import { AdventureCard } from "@/components/public/adventure-card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();
  const adventures = await prisma.adventure.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-navy-600">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-gold-400">
            Goat Adventures
          </Link>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Adventures
            </Link>
            <a
              href="https://goatrental.cz"
              className="hover:text-white transition"
              target="_blank"
            >
              Bike Rental
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <p className="text-gold-500 tracking-widest text-sm mb-4">
          &mdash; EXPLORE PATTAYA &mdash;
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          Unforgettable{" "}
          <span className="italic text-gold-400">Adventures</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Join us and embrace the thrill of the ride while exploring new
          horizons.
        </p>
      </section>

      {/* Adventures Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure) => (
            <AdventureCard
              key={adventure.id}
              title={adventure.title}
              slug={adventure.slug}
              description={adventure.description}
              adultPrice={adventure.adultPrice}
              imageUrl={adventure.imageUrl}
            />
          ))}
        </div>
        {adventures.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            More adventures coming soon...
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-600 py-8 text-center text-sm text-gray-500">
        Copyright &copy; Goat Rental
      </footer>
    </div>
  );
}

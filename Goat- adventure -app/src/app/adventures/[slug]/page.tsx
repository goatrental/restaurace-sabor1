import { prisma, ensureSeeded } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ScheduleTimeline } from "@/components/public/schedule-timeline";
import { PriceSection } from "@/components/public/price-section";
import { BookingForm } from "@/components/public/booking-form";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdventureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  await ensureSeeded();
  const adventure = await prisma.adventure.findUnique({
    where: { slug: params.slug },
  });

  if (!adventure || !adventure.isActive) notFound();

  const schedule = JSON.parse(adventure.scheduleJson);

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
              &larr; All Adventures
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-gold-400 text-center mb-8">
          {adventure.title}
        </h1>

        {/* YouTube */}
        {adventure.youtubeUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-12">
            <iframe
              src={adventure.youtubeUrl
                .replace("youtu.be/", "www.youtube.com/embed/")
                .replace("watch?v=", "embed/")}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {adventure.description}
        </p>

        {/* Schedule */}
        <div className="mb-12">
          <p className="text-gold-500 tracking-widest text-sm mb-2">
            Day Schedule
          </p>
          <h2 className="font-serif text-3xl italic mb-8">
            Your Perfect Day at Sea
          </h2>
          <ScheduleTimeline items={schedule} />
        </div>

        {/* Prices */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl text-center mb-8">Price List</h2>
          <PriceSection
            adultPrice={adventure.adultPrice}
            childPrice={adventure.childPrice}
            childFreeNote={adventure.childFreeNote}
          />
        </div>

        {/* Booking Form */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl text-center mb-8">
            Book This Adventure
          </h2>
          <BookingForm adventureId={adventure.id} />
        </div>
      </div>

      <footer className="border-t border-navy-600 py-8 text-center text-sm text-gray-500">
        Copyright &copy; Goat Rental
      </footer>
    </div>
  );
}

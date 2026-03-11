import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface AdventureCardProps {
  title: string;
  slug: string;
  description: string;
  adultPrice: number;
  imageUrl: string;
}

export function AdventureCard({
  title,
  slug,
  description,
  adultPrice,
  imageUrl,
}: AdventureCardProps) {
  return (
    <Link
      href={`/adventures/${slug}`}
      className="group block rounded-2xl border border-navy-600 bg-navy-800 overflow-hidden transition hover:border-gold-500"
    >
      <div className="aspect-video bg-navy-700 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-gold-400 mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {formatPrice(adultPrice)}
            <span className="text-sm font-normal text-gray-400">/person</span>
          </span>
          <span className="text-forest-600 font-medium group-hover:text-gold-400 transition">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

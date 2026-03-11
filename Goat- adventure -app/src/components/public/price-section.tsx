import { formatPrice } from "@/lib/utils";

interface PriceSectionProps {
  adultPrice: number;
  childPrice: number;
  childFreeNote: string;
}

export function PriceSection({
  adultPrice,
  childPrice,
  childFreeNote,
}: PriceSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-gold-500/30 bg-navy-800 p-6 text-center">
        <h3 className="font-serif text-xl text-gold-400 mb-2">Adult</h3>
        <p className="text-3xl font-bold text-white">
          {formatPrice(adultPrice)}
        </p>
      </div>
      <div className="rounded-2xl border border-gold-500/30 bg-navy-800 p-6 text-center">
        <h3 className="font-serif text-xl text-gold-400 mb-2">Children</h3>
        <p className="text-3xl font-bold text-white">
          {childPrice === 0 ? "FREE" : formatPrice(childPrice)}
        </p>
        {childFreeNote && (
          <p className="text-xs text-gray-400 mt-2">{childFreeNote}</p>
        )}
      </div>
    </div>
  );
}

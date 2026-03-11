interface ScheduleItem {
  time: string;
  emoji: string;
  title: string;
  description: string;
}

export function ScheduleTimeline({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-lg">
              {item.emoji}
            </div>
            {i < items.length - 1 && (
              <div className="w-px h-full bg-navy-600 mt-2" />
            )}
          </div>
          <div className="pb-6">
            <span className="text-xs text-gold-500 font-mono">
              {item.time}
            </span>
            <h4 className="font-serif text-lg text-white mt-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

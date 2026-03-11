const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/20 text-blue-400",
  CONFIRMED: "bg-green-500/20 text-green-400",
  REJECTED: "bg-red-500/20 text-red-400",
  COMPLETED: "bg-gray-500/20 text-gray-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/admin/stat-card";
import { formatPrice, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl text-gold-400 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Bookings" value={data?.totalBookings ?? 0} />
        <StatCard label="This Month" value={data?.monthBookings ?? 0} />
        <StatCard
          label="Revenue (Confirmed)"
          value={formatPrice(data?.revenue ?? 0)}
        />
      </div>

      <h2 className="font-serif text-xl text-white mb-4">Recent Bookings</h2>
      <div className="rounded-2xl border border-navy-600 bg-navy-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-600 text-left text-gray-400">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Adventure</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentBookings?.map(
              (b: {
                id: string;
                customerName: string;
                adventure: { title: string };
                date: string;
                status: string;
              }) => (
                <tr key={b.id} className="border-b border-navy-600/50">
                  <td className="px-4 py-3 text-white">{b.customerName}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {b.adventure.title}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {formatDate(b.date)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        b.status === "NEW"
                          ? "bg-blue-500/20 text-blue-400"
                          : b.status === "CONFIRMED"
                            ? "bg-green-500/20 text-green-400"
                            : b.status === "REJECTED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

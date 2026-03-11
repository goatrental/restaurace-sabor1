"use client";

import { useQuery } from "@tanstack/react-query";
import { BookingsTable } from "@/components/admin/bookings-table";
import { useState } from "react";

const statuses = ["ALL", "NEW", "CONFIRMED", "REJECTED", "COMPLETED"];

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      const res = await fetch(`/api/bookings?${params}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-gold-400 mb-8">Bookings</h1>

      <div className="flex gap-2 mb-6">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              statusFilter === s
                ? "bg-forest-600 text-white"
                : "bg-navy-700 text-gray-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <BookingsTable data={data ?? []} />
      )}
    </div>
  );
}

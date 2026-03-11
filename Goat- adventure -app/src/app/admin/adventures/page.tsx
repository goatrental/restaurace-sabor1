"use client";

import { useQuery } from "@tanstack/react-query";
import { AdventuresTable } from "@/components/admin/adventures-table";
import Link from "next/link";

export default function AdminAdventuresPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-adventures"],
    queryFn: async () => {
      const res = await fetch("/api/adventures");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-gold-400">Adventures</h1>
        <Link
          href="/admin/adventures/new"
          className="rounded-lg bg-forest-600 px-4 py-2 text-sm font-medium text-white hover:bg-forest-700"
        >
          + New Adventure
        </Link>
      </div>
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <AdventuresTable data={data ?? []} />
      )}
    </div>
  );
}

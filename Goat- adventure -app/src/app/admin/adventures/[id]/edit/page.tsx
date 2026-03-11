"use client";

import { useQuery } from "@tanstack/react-query";
import { AdventureForm } from "@/components/admin/adventure-form";
import { useParams } from "next/navigation";

export default function EditAdventurePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["adventure", id],
    queryFn: async () => {
      const res = await fetch(`/api/adventures/${id}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl text-gold-400 mb-8">Edit Adventure</h1>
      {data && <AdventureForm defaultValues={data} />}
    </div>
  );
}

"use client";

import { AdventureForm } from "@/components/admin/adventure-form";

export default function NewAdventurePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-gold-400 mb-8">New Adventure</h1>
      <AdventureForm />
    </div>
  );
}

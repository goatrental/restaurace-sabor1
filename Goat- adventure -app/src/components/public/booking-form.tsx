"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function BookingForm({ adventureId }: { adventureId: string }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adventureId,
      adults: 1,
      children: 0,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingInput) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => setSubmitted(true),
  });

  if (submitted) {
    return (
      <div className="rounded-2xl border border-forest-600 bg-forest-600/10 p-8 text-center">
        <h3 className="font-serif text-2xl text-gold-400 mb-2">
          Thank you!
        </h3>
        <p className="text-gray-300">
          Your booking request has been sent. We will contact you shortly to
          confirm.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name *</label>
          <input
            {...register("customerName")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {errors.customerName && (
            <p className="text-red-400 text-xs mt-1">
              {errors.customerName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email *</label>
          <input
            type="email"
            {...register("customerEmail")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {errors.customerEmail && (
            <p className="text-red-400 text-xs mt-1">
              {errors.customerEmail.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Phone *</label>
          <input
            {...register("customerPhone")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {errors.customerPhone && (
            <p className="text-red-400 text-xs mt-1">
              {errors.customerPhone.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Date *</label>
          <input
            type="date"
            {...register("date")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {errors.date && (
            <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Adults *</label>
            <input
              type="number"
              min={1}
              {...register("adults", { valueAsNumber: true })}
              className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Children</label>
            <input
              type="number"
              min={0}
              {...register("children", { valueAsNumber: true })}
              className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Message</label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none resize-none"
          placeholder="Any special requests or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-forest-600 py-4 font-medium text-white transition hover:bg-forest-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Sending..." : "Send Booking Request"}
      </button>

      {mutation.isError && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

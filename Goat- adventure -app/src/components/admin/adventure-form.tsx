"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adventureSchema, type AdventureInput } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AdventureFormProps {
  defaultValues?: AdventureInput & { id?: string };
}

export function AdventureForm({ defaultValues }: AdventureFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdventureInput>({
    resolver: zodResolver(adventureSchema),
    defaultValues: defaultValues ?? {
      title: "",
      slug: "",
      description: "",
      scheduleJson: "[]",
      adultPrice: 0,
      childPrice: 0,
      childFreeNote: "",
      imageUrl: "",
      youtubeUrl: "",
      isActive: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: AdventureInput) => {
      const url = isEdit
        ? `/api/adventures/${defaultValues!.id}`
        : "/api/adventures";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => router.push("/admin/adventures"),
  });

  const inputClass =
    "w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4 max-w-2xl"
    >
      <div>
        <label className="block text-sm text-gray-400 mb-1">Title</label>
        <input {...register("title")} className={inputClass} />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Slug</label>
        <input {...register("slug")} className={inputClass} />
        {errors.slug && (
          <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea {...register("description")} rows={3} className={inputClass} />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Schedule (JSON)</label>
        <textarea
          {...register("scheduleJson")}
          rows={6}
          className={`${inputClass} font-mono text-xs`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Adult Price (Baht)</label>
          <input
            type="number"
            {...register("adultPrice", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Child Price (Baht)</label>
          <input
            type="number"
            {...register("childPrice", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Children Free Note</label>
        <input {...register("childFreeNote")} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Image URL</label>
          <input {...register("imageUrl")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">YouTube URL</label>
          <input {...register("youtubeUrl")} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} id="isActive" />
        <label htmlFor="isActive" className="text-sm text-gray-400">Active</label>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-lg bg-forest-600 px-6 py-3 font-medium text-white transition hover:bg-forest-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Saving..." : isEdit ? "Update Adventure" : "Create Adventure"}
      </button>

      {mutation.isError && (
        <p className="text-red-400 text-sm">Something went wrong.</p>
      )}
    </form>
  );
}

"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface Adventure {
  id: string;
  title: string;
  slug: string;
  adultPrice: number;
  isActive: boolean;
}

const columnHelper = createColumnHelper<Adventure>();

export function AdventuresTable({ data }: { data: Adventure[] }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/adventures/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-adventures"] }),
  });

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <span className="text-white font-medium">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("slug", { header: "Slug" }),
    columnHelper.accessor("adultPrice", {
      header: "Price",
      cell: (info) => formatPrice(info.getValue()),
    }),
    columnHelper.accessor("isActive", {
      header: "Active",
      cell: (info) => (
        <span className={info.getValue() ? "text-green-400" : "text-red-400"}>
          {info.getValue() ? "Yes" : "No"}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/adventures/${info.row.original.id}/edit`}
            className="px-3 py-1 rounded bg-navy-700 text-gold-400 text-xs hover:bg-navy-600"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              if (confirm("Delete this adventure?")) {
                deleteMutation.mutate(info.row.original.id);
              }
            }}
            className="px-3 py-1 rounded bg-navy-700 text-red-400 text-xs hover:bg-navy-600"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl border border-navy-600 bg-navy-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-navy-600 text-left text-gray-400">
              {hg.headers.map((h) => (
                <th key={h.id} className="px-4 py-3">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-navy-600/50 text-gray-300">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatPrice, formatDate } from "@/lib/utils";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  adults: number;
  children: number;
  message: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  adventure: { title: string };
}

const columnHelper = createColumnHelper<Booking>();
const statuses = ["NEW", "CONFIRMED", "REJECTED", "COMPLETED"];

export function BookingsTable({ data }: { data: Booking[] }) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  const columns = [
    columnHelper.accessor("customerName", {
      header: "Customer",
      cell: (info) => (
        <div>
          <p className="text-white font-medium">{info.getValue()}</p>
          <p className="text-xs text-gray-500">{info.row.original.customerEmail}</p>
        </div>
      ),
    }),
    columnHelper.accessor("adventure.title", { header: "Adventure" }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("adults", {
      header: "Pax",
      cell: (info) => `${info.getValue()}A + ${info.row.original.children}C`,
    }),
    columnHelper.accessor("totalPrice", {
      header: "Total",
      cell: (info) => formatPrice(info.getValue()),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <select
          value={info.getValue()}
          onChange={(e) =>
            statusMutation.mutate({
              id: info.row.original.id,
              status: e.target.value,
            })
          }
          className="bg-navy-700 border border-navy-600 rounded px-2 py-1 text-xs text-white"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      {data.length === 0 && (
        <p className="text-center text-gray-500 py-8">No bookings yet.</p>
      )}
    </div>
  );
}

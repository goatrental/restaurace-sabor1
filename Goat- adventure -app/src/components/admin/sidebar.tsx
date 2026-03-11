"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/adventures", label: "Adventures" },
  { href: "/admin/bookings", label: "Bookings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-navy-800 border-r border-navy-600 p-6 flex flex-col">
      <Link
        href="/admin/dashboard"
        className="font-serif text-xl text-gold-400 mb-8"
      >
        Goat Admin
      </Link>
      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-lg text-sm transition ${
              pathname === link.href
                ? "bg-forest-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-navy-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/admin" })}
        className="mt-4 px-4 py-2 text-sm text-gray-400 hover:text-white transition text-left"
      >
        Sign Out
      </button>
    </aside>
  );
}

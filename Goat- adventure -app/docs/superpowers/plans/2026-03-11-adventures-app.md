# Goat Adventures App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js booking app for Goat Rental adventures with public browsing/booking and admin management panel.

**Architecture:** Next.js 14 App Router with two route groups: `(public)` for customer-facing pages and `(admin)` for the protected admin panel. Prisma + SQLite for data, API routes for mutations, NextAuth for admin auth.

**Tech Stack:** Next.js 14, Tailwind CSS, Prisma/SQLite, TanStack Query, TanStack Table, React Hook Form, Zod, NextAuth.js

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, providers)
│   ├── page.tsx                      # Public homepage - adventures listing
│   ├── adventures/
│   │   └── [slug]/
│   │       └── page.tsx              # Adventure detail + booking form
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts             # NextAuth API route
│   │   ├── adventures/
│   │   │   └── route.ts             # GET all, POST create adventure
│   │   ├── adventures/[id]/
│   │   │   └── route.ts             # GET one, PUT update, DELETE adventure
│   │   ├── bookings/
│   │   │   └── route.ts             # GET all, POST create booking
│   │   ├── bookings/[id]/
│   │   │   └── route.ts             # GET one, PATCH status update
│   │   └── dashboard/
│   │       └── route.ts             # GET dashboard stats
│   └── admin/
│       ├── layout.tsx                # Admin layout (sidebar, auth guard)
│       ├── page.tsx                  # Login page
│       ├── dashboard/
│       │   └── page.tsx              # Dashboard with stats
│       ├── adventures/
│       │   ├── page.tsx              # Adventures table
│       │   ├── new/page.tsx          # Create adventure form
│       │   └── [id]/edit/page.tsx    # Edit adventure form
│       └── bookings/
│           └── page.tsx              # Bookings table
├── components/
│   ├── providers.tsx                 # QueryClientProvider + SessionProvider
│   ├── public/
│   │   ├── adventure-card.tsx        # Card for adventures listing
│   │   ├── booking-form.tsx          # Booking form with react-hook-form
│   │   ├── schedule-timeline.tsx     # Day schedule timeline
│   │   └── price-section.tsx         # Price display component
│   └── admin/
│       ├── sidebar.tsx               # Admin sidebar navigation
│       ├── stat-card.tsx             # Dashboard stat card
│       ├── adventures-table.tsx      # TanStack Table for adventures
│       ├── bookings-table.tsx        # TanStack Table for bookings
│       ├── adventure-form.tsx        # Adventure create/edit form
│       └── status-badge.tsx          # Booking status badge
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # NextAuth config
│   ├── validations.ts                # Zod schemas
│   └── utils.ts                      # formatPrice, formatDate helpers
prisma/
├── schema.prisma                     # DB schema
└── seed.ts                           # Seed yacht adventure data
tailwind.config.ts                    # Custom colors/fonts
```

---

## Chunk 1: Project Setup & Database

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

Run:
```bash
cd "c:/Users/goren/OneDrive/Documents/weby/Goat- adventure -app"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Accept defaults. Since directory has files, it will scaffold around them.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install prisma @prisma/client next-auth @tanstack/react-query @tanstack/react-table react-hook-form @hookform/resolvers zod bcryptjs
npm install -D @types/bcryptjs ts-node
```

- [ ] **Step 3: Configure Tailwind with custom theme**

Replace `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a1628",
          800: "#0f1d32",
          700: "#132238",
          600: "#1a2d4a",
        },
        gold: {
          400: "#e8c36a",
          500: "#d4a853",
          600: "#c49a3d",
        },
        forest: {
          600: "#2d5a3d",
          700: "#245032",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Tailwind custom theme"
```

---

### Task 2: Set up Prisma schema and seed data

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/prisma.ts`

- [ ] **Step 1: Initialize Prisma**

Run:
```bash
npx prisma init --datasource-provider sqlite
```

- [ ] **Step 2: Write the schema**

Replace `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
}

model Adventure {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  description   String
  scheduleJson  String    // JSON string
  adultPrice    Float
  childPrice    Float
  childFreeNote String    @default("")
  imageUrl      String    @default("")
  youtubeUrl    String    @default("")
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  bookings      Booking[]
}

model Booking {
  id            String   @id @default(cuid())
  adventureId   String
  adventure     Adventure @relation(fields: [adventureId], references: [id])
  customerName  String
  customerEmail String
  customerPhone String
  date          DateTime
  adults        Int
  children      Int
  message       String   @default("")
  status        String   @default("NEW") // NEW, CONFIRMED, REJECTED, COMPLETED
  totalPrice    Float
  createdAt     DateTime @default(now())
}
```

- [ ] **Step 3: Set DATABASE_URL in .env**

Ensure `.env` has:
```
DATABASE_URL="file:./dev.db"
```

Ensure `.gitignore` includes `*.db`.

- [ ] **Step 4: Run migration**

```bash
npx prisma migrate dev --name init
```

- [ ] **Step 5: Create Prisma client singleton**

Create `src/lib/prisma.ts`:
```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 6: Write seed script**

Create `prisma/seed.ts`:
```ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@goatrental.cz" },
    update: {},
    create: {
      email: "admin@goatrental.cz",
      passwordHash,
      name: "Admin",
    },
  });

  // Create Yacht adventure
  await prisma.adventure.upsert({
    where: { slug: "yacht-adventure" },
    update: {},
    create: {
      title: "Full-day on Yacht Adventure",
      slug: "yacht-adventure",
      description:
        "Join us and embrace the thrill of the ride while exploring new horizons on a luxury yacht around Pattaya islands.",
      scheduleJson: JSON.stringify([
        {
          time: "11:20–12:50",
          emoji: "🌊",
          title: "Water Sports at Koh Sak",
          description:
            "Banana boat, jet ski, water slide, snorkeling and inflatable toys.",
        },
        {
          time: "12:50",
          emoji: "⛵",
          title: "Sail to Koh Phai",
          description:
            "Relax on deck with a cold drink as we cruise to Koh Phai.",
        },
        {
          time: "13:30–14:30",
          emoji: "🍽️",
          title: "Gourmet Lunch on Board",
          description: "Five-star Thai fusion finger food at sea.",
        },
        {
          time: "14:30–16:00",
          emoji: "🏖️",
          title: "Snorkeling & Beach",
          description: "Explore Koh Phai beach and coral gardens.",
        },
        {
          time: "16:00–17:00",
          emoji: "🎣",
          title: "Fishing at Koh Khrok",
          description:
            "Traditional Thai rod fishing for the whole family.",
        },
        {
          time: "17:00–18:00",
          emoji: "🥂",
          title: "Golden Champagne Sunset",
          description:
            "Raise a glass with breathtaking views of the Sanctuary of Truth.",
        },
      ]),
      adultPrice: 3580,
      childPrice: 0,
      childFreeNote:
        "Kids up to 110 cm tall join for free. Above 110 cm, the price is the same as adults.",
      imageUrl: "/images/yacht.jpg",
      youtubeUrl: "https://youtu.be/hQd8qj15tIE",
      isActive: true,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
```

- [ ] **Step 7: Add seed command to package.json**

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

- [ ] **Step 8: Run seed**

```bash
npx prisma db seed
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Prisma schema with User, Adventure, Booking models and seed data"
```

---

## Chunk 2: Auth & Shared Infrastructure

### Task 3: Set up NextAuth

**Files:**
- Create: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/components/providers.tsx`

- [ ] **Step 1: Add NEXTAUTH_SECRET to .env**

Add to `.env`:
```
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

- [ ] **Step 2: Create auth config**

Create `src/lib/auth.ts`:
```ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin" },
};
```

- [ ] **Step 3: Create auth API route**

Create `src/app/api/auth/[...nextauth]/route.ts`:
```ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] **Step 4: Create providers wrapper**

Create `src/components/providers.tsx`:
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add NextAuth credentials auth and providers"
```

---

### Task 4: Create utility functions and Zod schemas

**Files:**
- Create: `src/lib/utils.ts`, `src/lib/validations.ts`

- [ ] **Step 1: Create utils**

Create `src/lib/utils.ts`:
```ts
export function formatPrice(price: number): string {
  return `฿ ${price.toLocaleString("en-US")}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
```

- [ ] **Step 2: Create Zod schemas**

Create `src/lib/validations.ts`:
```ts
import { z } from "zod";

export const bookingSchema = z.object({
  adventureId: z.string().min(1),
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(5, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  adults: z.number().int().min(1, "At least 1 adult"),
  children: z.number().int().min(0),
  message: z.string().optional(),
});

export const adventureSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description is required"),
  scheduleJson: z.string().min(2, "Schedule is required"),
  adultPrice: z.number().positive("Price must be positive"),
  childPrice: z.number().min(0),
  childFreeNote: z.string().optional(),
  imageUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  isActive: z.boolean(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type AdventureInput = z.infer<typeof adventureSchema>;
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add utility functions and Zod validation schemas"
```

---

## Chunk 3: API Routes

### Task 5: Adventures API

**Files:**
- Create: `src/app/api/adventures/route.ts`, `src/app/api/adventures/[id]/route.ts`

- [ ] **Step 1: Create adventures list/create route**

Create `src/app/api/adventures/route.ts`:
```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adventureSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get("active") === "true";
  const adventures = await prisma.adventure.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(adventures);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = adventureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const adventure = await prisma.adventure.create({
    data: {
      ...parsed.data,
      childFreeNote: parsed.data.childFreeNote ?? "",
      imageUrl: parsed.data.imageUrl ?? "",
      youtubeUrl: parsed.data.youtubeUrl ?? "",
    },
  });
  return NextResponse.json(adventure, { status: 201 });
}
```

- [ ] **Step 2: Create single adventure route**

Create `src/app/api/adventures/[id]/route.ts`:
```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adventureSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const adventure = await prisma.adventure.findUnique({
    where: { id: params.id },
  });
  if (!adventure) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(adventure);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = adventureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const adventure = await prisma.adventure.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      childFreeNote: parsed.data.childFreeNote ?? "",
      imageUrl: parsed.data.imageUrl ?? "",
      youtubeUrl: parsed.data.youtubeUrl ?? "",
    },
  });
  return NextResponse.json(adventure);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.adventure.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add adventures API routes (CRUD)"
```

---

### Task 6: Bookings API

**Files:**
- Create: `src/app/api/bookings/route.ts`, `src/app/api/bookings/[id]/route.ts`

- [ ] **Step 1: Create bookings list/create route**

Create `src/app/api/bookings/route.ts`:
```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const adventureId = searchParams.get("adventureId");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (adventureId) where.adventureId = adventureId;

  const bookings = await prisma.booking.findMany({
    where,
    include: { adventure: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const adventure = await prisma.adventure.findUnique({
    where: { id: parsed.data.adventureId },
  });
  if (!adventure) {
    return NextResponse.json({ error: "Adventure not found" }, { status: 404 });
  }

  const totalPrice = parsed.data.adults * adventure.adultPrice;

  const booking = await prisma.booking.create({
    data: {
      ...parsed.data,
      message: parsed.data.message ?? "",
      date: new Date(parsed.data.date),
      totalPrice,
    },
  });
  return NextResponse.json(booking, { status: 201 });
}
```

- [ ] **Step 2: Create single booking route (status update)**

Create `src/app/api/bookings/[id]/route.ts`:
```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["NEW", "CONFIRMED", "REJECTED", "COMPLETED"]),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { adventure: true },
  });
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(booking);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });
  return NextResponse.json(booking);
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add bookings API routes (create, list, status update)"
```

---

### Task 7: Dashboard API

**Files:**
- Create: `src/app/api/dashboard/route.ts`

- [ ] **Step 1: Create dashboard stats route**

Create `src/app/api/dashboard/route.ts`:
```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalBookings, monthBookings, revenue, recentBookings] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { adventure: { select: { title: true } } },
      }),
    ]);

  return NextResponse.json({
    totalBookings,
    monthBookings,
    revenue: revenue._sum.totalPrice ?? 0,
    recentBookings,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add dashboard stats API route"
```

---

## Chunk 4: Public Frontend

### Task 8: Root layout and homepage

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update root layout**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goat Adventures | Pattaya",
  description:
    "Book unforgettable adventures in Pattaya - yacht tours, snorkeling, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-900 text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update globals.css**

Ensure `src/app/globals.css` contains:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Create adventure card component**

Create `src/components/public/adventure-card.tsx`:
```tsx
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface AdventureCardProps {
  title: string;
  slug: string;
  description: string;
  adultPrice: number;
  imageUrl: string;
}

export function AdventureCard({
  title,
  slug,
  description,
  adultPrice,
  imageUrl,
}: AdventureCardProps) {
  return (
    <Link
      href={`/adventures/${slug}`}
      className="group block rounded-2xl border border-navy-600 bg-navy-800 overflow-hidden transition hover:border-gold-500"
    >
      <div className="aspect-video bg-navy-700 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-gold-400 mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {formatPrice(adultPrice)}
            <span className="text-sm font-normal text-gray-400">/person</span>
          </span>
          <span className="text-forest-600 font-medium group-hover:text-gold-400 transition">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create homepage**

Replace `src/app/page.tsx`:
```tsx
import { prisma } from "@/lib/prisma";
import { AdventureCard } from "@/components/public/adventure-card";
import Link from "next/link";

export default async function HomePage() {
  const adventures = await prisma.adventure.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-navy-600">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-gold-400">
            🐐 Goat Adventures
          </Link>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Adventures
            </Link>
            <a
              href="https://goatrental.cz"
              className="hover:text-white transition"
              target="_blank"
            >
              Bike Rental
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <p className="text-gold-500 tracking-widest text-sm mb-4">
          — EXPLORE PATTAYA —
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          Unforgettable{" "}
          <span className="italic text-gold-400">Adventures</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Join us and embrace the thrill of the ride while exploring new
          horizons.
        </p>
      </section>

      {/* Adventures Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure) => (
            <AdventureCard
              key={adventure.id}
              title={adventure.title}
              slug={adventure.slug}
              description={adventure.description}
              adultPrice={adventure.adultPrice}
              imageUrl={adventure.imageUrl}
            />
          ))}
        </div>
        {adventures.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            More adventures coming soon...
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-600 py-8 text-center text-sm text-gray-500">
        Copyright © Goat Rental
      </footer>
    </div>
  );
}
```

- [ ] **Step 5: Verify homepage loads**

```bash
npm run dev
```
Open http://localhost:3000 — should show dark page with yacht adventure card.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add public homepage with adventures listing"
```

---

### Task 9: Adventure detail page with booking form

**Files:**
- Create: `src/components/public/schedule-timeline.tsx`, `src/components/public/price-section.tsx`, `src/components/public/booking-form.tsx`
- Create: `src/app/adventures/[slug]/page.tsx`

- [ ] **Step 1: Create schedule timeline component**

Create `src/components/public/schedule-timeline.tsx`:
```tsx
interface ScheduleItem {
  time: string;
  emoji: string;
  title: string;
  description: string;
}

export function ScheduleTimeline({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-lg">
              {item.emoji}
            </div>
            {i < items.length - 1 && (
              <div className="w-px h-full bg-navy-600 mt-2" />
            )}
          </div>
          <div className="pb-6">
            <span className="text-xs text-gold-500 font-mono">
              {item.time}
            </span>
            <h4 className="font-serif text-lg text-white mt-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create price section component**

Create `src/components/public/price-section.tsx`:
```tsx
import { formatPrice } from "@/lib/utils";

interface PriceSectionProps {
  adultPrice: number;
  childPrice: number;
  childFreeNote: string;
}

export function PriceSection({
  adultPrice,
  childPrice,
  childFreeNote,
}: PriceSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-gold-500/30 bg-navy-800 p-6 text-center">
        <h3 className="font-serif text-xl text-gold-400 mb-2">Adult</h3>
        <p className="text-3xl font-bold text-white">
          {formatPrice(adultPrice)}
        </p>
      </div>
      <div className="rounded-2xl border border-gold-500/30 bg-navy-800 p-6 text-center">
        <h3 className="font-serif text-xl text-gold-400 mb-2">Children</h3>
        <p className="text-3xl font-bold text-white">
          {childPrice === 0 ? "FREE" : formatPrice(childPrice)}
        </p>
        {childFreeNote && (
          <p className="text-xs text-gray-400 mt-2">{childFreeNote}</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create booking form component**

Create `src/components/public/booking-form.tsx`:
```tsx
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
            <label className="block text-sm text-gray-400 mb-1">
              Adults *
            </label>
            <input
              type="number"
              min={1}
              {...register("adults", { valueAsNumber: true })}
              className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Children
            </label>
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
```

- [ ] **Step 4: Create adventure detail page**

Create `src/app/adventures/[slug]/page.tsx`:
```tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ScheduleTimeline } from "@/components/public/schedule-timeline";
import { PriceSection } from "@/components/public/price-section";
import { BookingForm } from "@/components/public/booking-form";
import Link from "next/link";

export default async function AdventureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const adventure = await prisma.adventure.findUnique({
    where: { slug: params.slug },
  });

  if (!adventure || !adventure.isActive) notFound();

  const schedule = JSON.parse(adventure.scheduleJson);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-navy-600">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-gold-400">
            🐐 Goat Adventures
          </Link>
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Adventures
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl text-gold-400 text-center mb-8">
          {adventure.title}
        </h1>

        {/* YouTube */}
        {adventure.youtubeUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-12">
            <iframe
              src={adventure.youtubeUrl
                .replace("youtu.be/", "www.youtube.com/embed/")
                .replace("watch?v=", "embed/")}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {adventure.description}
        </p>

        {/* Schedule */}
        <div className="mb-12">
          <p className="text-gold-500 tracking-widest text-sm mb-2">
            Day Schedule
          </p>
          <h2 className="font-serif text-3xl italic mb-8">
            Your Perfect Day at Sea
          </h2>
          <ScheduleTimeline items={schedule} />
        </div>

        {/* Prices */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl text-center mb-8">Price List</h2>
          <PriceSection
            adultPrice={adventure.adultPrice}
            childPrice={adventure.childPrice}
            childFreeNote={adventure.childFreeNote}
          />
        </div>

        {/* Booking Form */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl text-center mb-8">
            Book This Adventure
          </h2>
          <BookingForm adventureId={adventure.id} />
        </div>
      </div>

      <footer className="border-t border-navy-600 py-8 text-center text-sm text-gray-500">
        Copyright © Goat Rental
      </footer>
    </div>
  );
}
```

- [ ] **Step 5: Verify detail page loads**

Open http://localhost:3000/adventures/yacht-adventure — should show full adventure page with timeline, prices, and booking form.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add adventure detail page with schedule, prices, and booking form"
```

---

## Chunk 5: Admin Panel

### Task 10: Admin layout and login

**Files:**
- Create: `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/components/admin/sidebar.tsx`

- [ ] **Step 1: Create admin sidebar**

Create `src/components/admin/sidebar.tsx`:
```tsx
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
        🐐 Goat Admin
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
        className="mt-4 px-4 py-2 text-sm text-gray-400 hover:text-white transition"
      >
        Sign Out
      </button>
    </aside>
  );
}
```

- [ ] **Step 2: Create admin layout**

Create `src/app/admin/layout.tsx`:
```tsx
"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Login page doesn't need sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Create admin login page**

Create `src/app/admin/page.tsx`:
```tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginForm>();

  if (session) {
    router.push("/admin/dashboard");
    return null;
  }

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-gold-400 text-center mb-8">
          🐐 Goat Admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-forest-600 py-3 font-medium text-white transition hover:bg-forest-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add admin layout with sidebar and login page"
```

---

### Task 11: Admin dashboard

**Files:**
- Create: `src/components/admin/stat-card.tsx`, `src/app/admin/dashboard/page.tsx`

- [ ] **Step 1: Create stat card component**

Create `src/components/admin/stat-card.tsx`:
```tsx
export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-navy-600 bg-navy-800 p-6">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gold-400">{value}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create dashboard page**

Create `src/app/admin/dashboard/page.tsx`:
```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add admin dashboard with stats and recent bookings"
```

---

### Task 12: Admin bookings table

**Files:**
- Create: `src/components/admin/status-badge.tsx`, `src/components/admin/bookings-table.tsx`, `src/app/admin/bookings/page.tsx`

- [ ] **Step 1: Create status badge**

Create `src/components/admin/status-badge.tsx`:
```tsx
const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/20 text-blue-400",
  CONFIRMED: "bg-green-500/20 text-green-400",
  REJECTED: "bg-red-500/20 text-red-400",
  COMPLETED: "bg-gray-500/20 text-gray-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status] ?? ""}`}
    >
      {status}
    </span>
  );
}
```

- [ ] **Step 2: Create bookings table component**

Create `src/components/admin/bookings-table.tsx`:
```tsx
"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusBadge } from "./status-badge";
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
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
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
          <p className="text-xs text-gray-500">
            {info.row.original.customerEmail}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("adventure.title", {
      header: "Adventure",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("adults", {
      header: "Pax",
      cell: (info) =>
        `${info.getValue()}A + ${info.row.original.children}C`,
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
            <option key={s} value={s}>
              {s}
            </option>
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
```

- [ ] **Step 3: Create bookings page**

Create `src/app/admin/bookings/page.tsx`:
```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add admin bookings page with filterable table and status management"
```

---

### Task 13: Admin adventures CRUD

**Files:**
- Create: `src/components/admin/adventures-table.tsx`, `src/components/admin/adventure-form.tsx`
- Create: `src/app/admin/adventures/page.tsx`, `src/app/admin/adventures/new/page.tsx`, `src/app/admin/adventures/[id]/edit/page.tsx`

- [ ] **Step 1: Create adventures table**

Create `src/components/admin/adventures-table.tsx`:
```tsx
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
        <span
          className={
            info.getValue()
              ? "text-green-400"
              : "text-red-400"
          }
        >
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
```

- [ ] **Step 2: Create adventure form component**

Create `src/components/admin/adventure-form.tsx`:
```tsx
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
          <p className="text-red-400 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Schedule (JSON)
        </label>
        <textarea
          {...register("scheduleJson")}
          rows={6}
          className={`${inputClass} font-mono text-xs`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Adult Price (฿)
          </label>
          <input
            type="number"
            {...register("adultPrice", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Child Price (฿)
          </label>
          <input
            type="number"
            {...register("childPrice", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Children Free Note
        </label>
        <input {...register("childFreeNote")} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Image URL</label>
          <input {...register("imageUrl")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            YouTube URL
          </label>
          <input {...register("youtubeUrl")} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} id="isActive" />
        <label htmlFor="isActive" className="text-sm text-gray-400">
          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-lg bg-forest-600 px-6 py-3 font-medium text-white transition hover:bg-forest-700 disabled:opacity-50"
      >
        {mutation.isPending
          ? "Saving..."
          : isEdit
            ? "Update Adventure"
            : "Create Adventure"}
      </button>

      {mutation.isError && (
        <p className="text-red-400 text-sm">Something went wrong.</p>
      )}
    </form>
  );
}
```

- [ ] **Step 3: Create adventures list page**

Create `src/app/admin/adventures/page.tsx`:
```tsx
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
```

- [ ] **Step 4: Create new adventure page**

Create `src/app/admin/adventures/new/page.tsx`:
```tsx
import { AdventureForm } from "@/components/admin/adventure-form";

export default function NewAdventurePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-gold-400 mb-8">
        New Adventure
      </h1>
      <AdventureForm />
    </div>
  );
}
```

- [ ] **Step 5: Create edit adventure page**

Create `src/app/admin/adventures/[id]/edit/page.tsx`:
```tsx
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
      <h1 className="font-serif text-3xl text-gold-400 mb-8">
        Edit Adventure
      </h1>
      {data && <AdventureForm defaultValues={data} />}
    </div>
  );
}
```

- [ ] **Step 6: Verify admin panel works**

```bash
npm run dev
```
Open http://localhost:3000/admin — login with admin@goatrental.cz / admin123

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add admin adventures CRUD with table and form"
```

---

## Chunk 6: Final polish

### Task 14: Verify full flow

- [ ] **Step 1: Test public flow**

1. Open http://localhost:3000 — see yacht adventure card
2. Click card → detail page with schedule, prices, booking form
3. Fill booking form and submit → see "Thank you" message

- [ ] **Step 2: Test admin flow**

1. Open http://localhost:3000/admin → login
2. Dashboard shows stats
3. Bookings page shows the submitted booking, change status
4. Adventures page shows yacht, can edit

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Goat Adventures app with public booking and admin panel"
```

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let seeded = false;
export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  try {
    const count = await prisma.adventure.count();
    if (count > 0) return;
    const { hash } = await import("bcryptjs");
    const passwordHash = await hash("admin123", 12);
    await prisma.user.create({
      data: { email: "admin@goatrental.cz", passwordHash, name: "Admin" },
    }).catch(() => {});
    await prisma.adventure.create({
      data: {
        title: "Full-day on Yacht Adventure",
        slug: "yacht-adventure",
        description: "Join us and embrace the thrill of the ride while exploring new horizons on a luxury yacht around Pattaya islands.",
        scheduleJson: JSON.stringify([
          { time: "11:20\u201312:50", emoji: "\u{1F30A}", title: "Water Sports at Koh Sak", description: "Banana boat, jet ski, water slide, snorkeling and inflatable toys." },
          { time: "12:50", emoji: "\u26F5", title: "Sail to Koh Phai", description: "Relax on deck with a cold drink as we cruise to Koh Phai." },
          { time: "13:30\u201314:30", emoji: "\u{1F37D}\uFE0F", title: "Gourmet Lunch on Board", description: "Five-star Thai fusion finger food at sea." },
          { time: "14:30\u201316:00", emoji: "\u{1F3D6}\uFE0F", title: "Snorkeling & Beach", description: "Explore Koh Phai beach and coral gardens." },
          { time: "16:00\u201317:00", emoji: "\u{1F3A3}", title: "Fishing at Koh Khrok", description: "Traditional Thai rod fishing for the whole family." },
          { time: "17:00\u201318:00", emoji: "\u{1F942}", title: "Golden Champagne Sunset", description: "Raise a glass with breathtaking views of the Sanctuary of Truth." },
        ]),
        adultPrice: 3580, childPrice: 0,
        childFreeNote: "Kids up to 110 cm tall join for free. Above 110 cm, the price is the same as adults.",
        imageUrl: "https://goatrental.cz/web/image/2086-1dd8fb72/pic%201.webp",
        youtubeUrl: "https://youtu.be/hQd8qj15tIE",
        isActive: true,
      },
    }).catch(() => {});
  } catch { /* ignore */ }
}

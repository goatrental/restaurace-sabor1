import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
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
          description: "Banana boat, jet ski, water slide, snorkeling and inflatable toys.",
        },
        {
          time: "12:50",
          emoji: "⛵",
          title: "Sail to Koh Phai",
          description: "Relax on deck with a cold drink as we cruise to Koh Phai.",
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
          description: "Traditional Thai rod fishing for the whole family.",
        },
        {
          time: "17:00–18:00",
          emoji: "🥂",
          title: "Golden Champagne Sunset",
          description: "Raise a glass with breathtaking views of the Sanctuary of Truth.",
        },
      ]),
      adultPrice: 3580,
      childPrice: 0,
      childFreeNote: "Kids up to 110 cm tall join for free. Above 110 cm, the price is the same as adults.",
      imageUrl: "https://goatrental.cz/web/image/2086-1dd8fb72/pic%201.webp",
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

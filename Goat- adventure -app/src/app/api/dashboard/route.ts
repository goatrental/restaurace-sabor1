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

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
